import "./styles/detail.less";
import * as common from "./common.js";

export var config = {
    data: false,
    src: false
};

common.events.on('rebind', function(ui) {
  config = ui.detail
});

common.methods.showDetail = function(e, f) {
  config.data = e;
  config.src = f;
}