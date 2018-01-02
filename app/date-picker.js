export default class DatePicker {
  constructor (target, options) {
    this.target = target;
    this.options = options;
    this.createElement(options);
    this.delegateEvent(options);
    this.setValue(options);
  }
  createElement(options) {}
  delegateEvent(options) {}
  setValue (options) {}
}