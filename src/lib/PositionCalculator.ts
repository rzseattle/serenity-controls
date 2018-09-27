export interface IPositionCalculatorOptions {
    itemAt: string;
    relativeToAt: string;
    offsetX?: number;
    offsetY?: number;
    theSameWidth?: boolean;
}

export class PositionCalculator {
    private item: HTMLElement;
    private target: HTMLElement;
    private options: IPositionCalculatorOptions;
    private defaults: IPositionCalculatorOptions = {
        itemAt: "top left",
        relativeToAt: "top left",
        offsetX: 0,
        offsetY: 0,
        theSameWidth: false,
    };

    constructor(target: HTMLElement, item: HTMLElement, options: Partial<IPositionCalculatorOptions> = {}) {
        this.item = item;
        this.target = target;
        this.options = { ...this.defaults, ...options };
    }

    private getRefPoint(config: string, position: ClientRect): number[] {
        const [vertical, horizontal] = config.split(" ");
        let x: number;
        let y: number;

        if (horizontal == "left") {
            x = position.left;
        } else if (horizontal == "right") {
            x = position.left + position.width;
        } else if (horizontal == "middle") {
            x = position.left + position.width / 2;
        }
        if (vertical == "top") {
            y = position.top;
        } else if (vertical == "bottom") {
            y = position.top + position.height;
        } else if (vertical == "middle") {
            y = position.top + position.height / 2;
        }

        return [x, y];
    }

    public getItemContainerPositionCorrection() {
        const corr = [0, 0];

        let currentElement: HTMLElement | Node = this.item;
        while (currentElement) {
            currentElement = currentElement.parentNode;
            if (currentElement instanceof HTMLElement) {
                const element: HTMLElement = currentElement as HTMLElement;
                const style = window.getComputedStyle(element, null);
                if (style.position == "relative") {
                    const clientRect = element.getBoundingClientRect();
                    corr[0] -= clientRect.left;
                    corr[1] -= clientRect.top;
                } else {
                    //console.log(style.position);
                }
            }
        }
        return corr;
    }

    public calculate() {
        const targetPositionData = this.target.getBoundingClientRect();
        const targetRefPoint = this.getRefPoint(this.options.relativeToAt, targetPositionData);

        if (this.options.theSameWidth) {
            this.item.style.width = targetPositionData.width + "px";
        }

        const itemPositionData = this.item.getBoundingClientRect();

        // const correction = this.getItemContainerPositionCorrection();
        const correction = [0, 0];

        const [vertical, horizontal] = this.options.itemAt.split(" ");
        let x: number;
        let y: number;

        if (horizontal == "left") {
            x = 0;
        } else if (horizontal == "right") {
            x = -itemPositionData.width;
        } else if (horizontal == "middle") {
            x = -itemPositionData.width / 2;
        }
        if (vertical == "top") {
            y = 0;
        } else if (vertical == "bottom") {
            y = -itemPositionData.height;
        } else if (vertical == "middle") {
            y = -itemPositionData.height / 2;
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        return {
            left: targetRefPoint[0] + x + this.options.offsetX  + correction[0] + scrollLeft,
            top: targetRefPoint[1] + y + this.options.offsetY + correction[1] + scrollTop,
        };
    }
}
