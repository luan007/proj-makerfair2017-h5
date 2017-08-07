import "./styles/detail.less";
import * as common from "./common.js";

export var config = {
    data: false
};

common.events.on('rebind', function(ui) {
  config = ui.detail
});

common.methods.showDetail = function(e) {
  config.data = e;
}