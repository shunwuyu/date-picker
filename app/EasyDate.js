const METHODS = {
  m: 'Month',
  d: 'Date',
  y: 'FullYear'
};
export default class EasyDate {
  constructor(offset) {
    this.base = new Date();
    this.base.setHours(0);
    this.base.setMinutes(0);
    this.base.setSeconds(0);
    this.base.setMilliseconds(0);
    this.add(offset);
  }
  add(offset) {
    offset = 
      EasyDate.parse(offset);
    if (!offset) {
      return;
    }
    for (let key in offset) {
      let method = METHODS[key];
      this.base[`set${method}`](
        this.base[`get${method}`]()
      +offset[key]);
    }
    // +1m +1  m
    
  }
  toDate() {
    return this.base;
  }
  static parse(offset) {
    if (!offset) return false;
    offset = offset.toLowerCase();
    let result = {};
    offset.replace(/([+-]?\d+)([ymd])/g,
     (match, number, unit) => {
      result[unit] = Number(number);
    });
    return result;
  }
}