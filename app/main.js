import Picker from './date-picker';
console.log('eee');
$('body').on('click', '.tqb-date-picker-input', event => {
  let target = $(event.currentTarget);
  let options = target.data();
  let picker = options.tqbDatePicker;
  if (picker) {
    picker.show();
  }
  picker = new Picker(target, options);
  target.data('tqb-date-picker', picker);
});