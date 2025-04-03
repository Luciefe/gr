let _draggedItem = null;
let _dragTarget = null;
export let currentFocusedFolder = null;
let _contextMenuTarget = null;

export function getDraggedItem() {
    return _draggedItem;
}

export function setDraggedItem(item) {
    _draggedItem = item;
}

export function getDragTarget() {
    return _dragTarget;
}

export function setDragTarget(target) {
    _dragTarget = target;
}

export function getContextMenuTarget() {
    return _contextMenuTarget;
}

export function setContextMenuTarget(target) {
    _contextMenuTarget = target;
}

let isDragging = false;
let lastDropTarget = null;

export function setIsDragging(value) {
    isDragging = value;
}

export function getIsDragging() {
    return isDragging;
}

export function setLastDropTarget(target) {
    lastDropTarget = target;
}

export function getLastDropTarget() {
    return lastDropTarget;
}
