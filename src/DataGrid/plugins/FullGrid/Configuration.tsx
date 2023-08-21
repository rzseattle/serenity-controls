import { IPersistentColumn, IPersistentState } from "./FullGrid";
import { PrintJSON } from "../../../PrintJSON";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useCallback, useEffect, useState } from "react";
import { CommonIcons } from "../../../lib/CommonIcons";

const Configuration = ({ persistent }: { persistent: IPersistentState }) => {
    const [columns, setColumns] = useState(persistent?.columns);
    const [isConfigModal, setConfigModal] = useState(false);

    useEffect(() => {
        setColumns(persistent?.columns.filter((el) => el.applyTo !== undefined));
    }, [persistent]);

    const moveColumn = useCallback((dragIndex: number, hoverIndex: number) => {
        setColumns((prevColumns) =>
            produce(prevColumns, (draft) => {
                draft.splice(dragIndex /*the index */, 1);
                draft.splice(hoverIndex, 0, prevColumns[dragIndex]);
            }),
        );
    }, []);

    const renderCard = useCallback((column: IPersistentColumn, index: number) => {
        return (
            <Column
                key={column.applyTo}
                index={index}
                id={column.applyTo}
                text={column.caption}
                moveCard={moveColumn}
            />
        );
    }, []);

    if (columns === undefined) {
        return <></>;
    }
    return (
        <>
            <a onClick={() => setConfigModal(true)}>
                <CommonIcons.list />
            </a>
            {isConfigModal && (
                <>
                    <Modal
                        show={true}
                        title={"Konfiguracja tabeli"}
                        showHideLink={true}
                        onHide={() => setConfigModal(false)}
                    >
                        <div style={{ padding: "5px 10px" }}>
                            <DndProvider backend={HTML5Backend}>
                                {columns.map((column, i) => {
                                    return renderCard(column, i);
                                })}
                            </DndProvider>
                            <hr />
                            <div style={{ textAlign: "right" }}>
                                <button className={"btn btn-danger"} style={{ float: "left" }}>
                                    Wyczyść
                                </button>
                                <button className={"btn btn-primary "}>Zastosuj</button>
                                <button className={"btn  "}>Anuluj</button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
            {/*<PrintJSON json={columns} />*/}
        </>
    );
};

import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import produce from "immer";
import { Modal } from "../../../Modal";

const style = {
    border: "1px dashed gray",
    padding: "0.5rem 0.5rem 0.5rem 0",
    marginBottom: "5px",
    backgroundColor: "white",
    cursor: "move",
    display: "flex",
    alignItems: "center",
};

export interface CardProps {
    id: any;
    text: string | number;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const ItemTypes = {
    CARD: "card",
};

export const Column: FC<CardProps> = ({ id, text, index, moveCard }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
            <input
                type={"checkbox"}
                style={{ width: 15, display: "inline", padding: 0, margin: "0 10px", height: 14 }}
            />{" "}
            {text}
        </div>
    );
};

export default Configuration;
