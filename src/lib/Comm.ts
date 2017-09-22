interface IResponseCallback {
    (response: any): any
}

class Comm {

    private events: any;
    private method: string;
    private url: string;
    private data: any;
    private namespace: string;

    constructor(url) {

        this.url = url;
        this.data = {};
        this.namespace = null;

        this.events = {
            beforeSend: [],
            progress: [],
            response: [],
            error: [],
            connectionError: [],
            success: [],
            validationErrors: [],
            finish: []
        };
        this.method = 'POST';
    }


    on(event: string, callback: IResponseCallback) {
        if (!Array.isArray(this.events[event])) {
            console.error('Unknow event: ' + event);
            console.log(this.events);
        } else {
            this.events[event].push(callback);
        }
    }

    callEvent(event, data) {
        this.events[event].map(el => el(data));
    }

    setData(data) {
        this.data = data;
    }

    appendFormData(FormData: FormData, data, name = '') {

        if (data instanceof FileList) {

            for (var i = 0; i < data.length; i++) {
                // get item
                let file = data.item(i);
                FormData.append(name + '[]', file);

            }
            return;
        }

        if (Object.prototype.toString.call(data) == '[object File]') {
            FormData.append(name, data);
            return;
        }

        if (typeof data === 'object' && data != null) {

            Object.entries(data).map(([index, value]) => {
                if (name == '') {
                    this.appendFormData(FormData, value, index);
                } else {
                    //test for array in field name
                    let openBracket = index.indexOf('[');
                    let newName = name + '[' + index + ']';
                    if (openBracket != -1) {
                        newName = name + '[' + index.slice(0, openBracket) + ']' + index.slice(openBracket);
                    }
                    this.appendFormData(FormData, value, newName);
                }
            });
        } else {
            //if (data && data != null) {
            FormData.append(name, data == null ? '' : data);
            //}
        }
    }

    prepareData() {
        let data = {};
        if (this.namespace) {
            data[this.namespace] = this.data;
        } else {
            data = this.data;
        }
        return data;
    }

    debugError(error) {
        let errorWindow = window.open('', '', 'width=800,height=600');
        errorWindow.document.write('<pre>' + error + '</pre>');
        errorWindow.focus();
    }


    send() {

        let data = this.prepareData();
        const formData = new FormData();
        if (this.method == 'POST') {
            this.appendFormData(formData, data);
        }

        this.callEvent('beforeSend', data);

        let xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
            this.callEvent('progress', {
                loaded: event.loaded,
                percent: Math.round(event.loaded / event.total * 100)
            });
        };

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let exceptionOccured = false;
                    let data;
                    try {
                        this.callEvent('response', xhr.response);
                        data = JSON.parse(xhr.response);
                    } catch (e) {
                        exceptionOccured = true;
                        this.debugError(e.message + '<hr />' + xhr.response);
                        this.callEvent('error', xhr.response);
                    }

                    if (!exceptionOccured) {
                        if (data.errors === undefined) {
                            this.callEvent('success', data);
                        } else {
                            this.callEvent('validationErrors', data);
                        }
                    }


                } else {
                    this.debugError(xhr.status + '<hr />');
                    this.callEvent('connectionError', xhr.response);
                }
                this.callEvent('finish', xhr);
            }
        };

        xhr.open(this.method, this.url, true);

        if (this.method == 'POST') {
            xhr.send(formData);
        } else if (this.method == 'GET') {
            xhr.send();
        } else if (this.method == 'PUT') {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }

    }


    static __preparePromise(method, url, data, callback): Promise<any> {
        return new Promise((resolve, reject) => {
            let comm = new Comm(url);
            comm.method = method;
            if (callback) {
                comm.on('success', callback);
            }
            comm.on('success', (data) => resolve(data));

            comm.on('validationErrors', (data) => reject(data));
            comm.on('connectionError', (data) => reject(data));
            comm.on('error', (data) => reject(data));

            comm.setData(data);
            comm.send();

        });
    }


    static _post(url, data = {}, callback = null): Promise<any> {
        return Comm.__preparePromise('POST', url, data, callback);
    }

    static _get(url, data = {}, callback = null): Promise<any> {
        return Comm.__preparePromise('GET', url, data, callback);
    }

    static _put(url, data = {}, callback = null): Promise<any> {
        return Comm.__preparePromise('PUT', url, data, callback);
    }
}

export default Comm;
