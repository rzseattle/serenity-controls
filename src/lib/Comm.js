class Comm {


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
            finish: [],
        };

    }


    on(event, callback) {
        if (!Array.isArray(this.events[event])) {
            console.error("Unknow event: " + event)
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

    appendFormData(FormData, data, name = '') {

        if (data instanceof FileList) {

            for (var i = 0; i < data.length; i++) {
                // get item
                let file = data.item(i);
                formData.append(name + '[]', file);

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
                    this.appendFormData(FormData, value, name + '[' + index + ']');
                }
            })
        } else {
            if (data && data != null) {
                FormData.append(name, data);
            }
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
        errorWindow.document.write(error);
        errorWindow.focus();
    }


    send() {


        const formData = new FormData();
        let data = this.prepareData();
        this.appendFormData(formData, data);

        this.callEvent('beforeSend', data);

        let xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
            this.callEvent('progress', {
                loaded: event.loaded,
                percent: Math.round(event.loaded / event.total * 100)
            });
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        this.callEvent('response', xhr.response);
                        let data = JSON.parse(xhr.response);
                        if (data.errors === undefined) {
                            this.callEvent('success', data);
                        } else {
                            this.callEvent('validationErrors', data);
                        }

                    } catch (e) {
                        this.debugError(e.message + '<hr />' + xhr.response);
                        this.callEvent('error', xhr.response);

                    }
                } else {
                    this.debugError(xhr.status + '<hr />');
                    this.callEvent('connectionError', xhr.response);
                }
                this.callEvent('finish', xhr);
            }
        };


        xhr.open('POST', this.url, true);
        xhr.send(formData);

    }


    static _post(url, data, callback) {
        let comm = new Comm(url);
        comm.on('success', callback);
        comm.setData(data);
        comm.send();
        return comm;
    }

}

export default Comm;