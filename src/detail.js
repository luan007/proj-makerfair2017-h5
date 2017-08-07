import "./styles/detail.less";
import * as common from "./common.js";

export var config = {
    data: undefined
};

common.events.on('rebind', function(ui) {
  config = ui.detail
});
