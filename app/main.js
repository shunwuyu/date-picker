// jquery是date-picker的依赖
import $ from "jquery";
import Factory from "./Factory";

$("body")
  .on("click", ".tqb-date-picker-input",
    event => {
      let target = $(event.currentTarget);
      let options = target.data();
      let picker = options.tqbDatePicker;
      if (picker) {
        return picker.show();
      }

      picker = Factory.createDatePicker(target, options);
      target.data('tqb-date-picker', picker);
  });