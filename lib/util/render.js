import path from "path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

export default function render(view, locals = {}) {

    let component = require(path.join(__dirname, '..', 'view', view));
    component = component.default || component;

    return renderToString(createElement(component, locals));

}