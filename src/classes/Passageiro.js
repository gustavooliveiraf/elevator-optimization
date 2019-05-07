class Passageiro {
  constructor(list) {
    // New passengers enter the list.
    // Purposely written list not to confuse with queue.
    this.list = list

    // Flag for optimization
    this.listChanged = true
  }

  // Returns an array with the people's floor.
  get getList() {
    this.listChanged = false

    var temp = this.list
    this.list = []
    return temp
  }

  set setList(newPassenger) {
    this.queue.push(newPassenger)
    this.getQueueChanged = true
  }

  get getListChanged() {
    return this.listChanged
  }

  set setListChanged(bool) {
    this.listChanged = bool
  }

  // Simulates the time until the person enters/leaves the elevator.
  // Let's assume that the passenger enters for sure after a second,
  // who will check is the stopToSensorRelases method of the Elevator class.
  // For simplicity and for execution not to delay, i will not call this function.
  async getIn() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 100)
    })
  }

  async getOut(passenger) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.list.delete(passenger)
        resolve(true)
      }, 100)
    })
  }
}

module.exports = Passageiro
