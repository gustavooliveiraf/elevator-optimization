var Heap = require("collections/heap")

class Elevador {
  constructor(currentFloorElevador, floorsCurrentlyOccupied) {
    // I chose Heap because it fits the problem better.
    // The minimum value (very used) is accessed in O(1), insertion/removal in O(log(n))
    this.passengersWaiting = new Heap(floorsCurrentlyOccupied, null, function (a, b) {
      return a.from - b.from
    })

    this.passengersInTheElevator = new Heap([], null, function (a, b) {
      return a.to - b.to
    })

    this.currentFloorElevador = currentFloorElevador
  }

  get getPassengersWaiting() {
    return this.passengersWaiting
  }

  set setPassengersWaiting(passengersWaiting) {
    this.passengersWaiting.push(passengersWaiting)
  }

  get getPassengersInTheElevator() {
    return this.passengersInTheElevator
  }

  set getPassengersInTheElevator(newPassenger) {
    this.passengersInTheElevator.push(newPassenger)
  }

  get getCurrentFloorElevador() {
    return this.currentFloorElevador
  }

  nearestPassengerToDown() {
    return this.passengersInTheElevator.max()
  }

  nearestPassengerToUp() {
    return this.passengersInTheElevator.min()
  }

  increaseCurrentFloorElevador() {
    this.currentFloorElevador++
  }

  decreaseCurrentFloorElevador() {
    this.currentFloorElevador--
  }

  deletePassengersWaiting(pass) {
    this.passengersWaiting.delete(pass)
  }

  deletePassengersInTheElevator(pass) {
    this.passengersInTheElevator.delete(pass)
  }
  
  firstFloorCalling() {
    return this.passengersWaiting.min() ? this.passengersWaiting.min().from : undefined
  }

  lastFloorCalling() {
    return this.passengersWaiting.max() ? this.passengersWaiting.max().from : undefined
  }

  // choose whether it is better to go up or down first. 
  upOrDown(direction) {
    if (direction && (this.passengersWaiting.length > 0 || this.passengersInTheElevator.length > 0)) {
      return direction === 'up' ? 'down' : 'up'
    } else if (this.firstFloorCalling() != undefined) {
      if ((this.getCurrentFloorElevador - this.firstFloorCalling()) < 0) return 'up'
      else if ((this.lastFloorCalling() - this.getCurrentFloorElevador) < 0) return 'down'
      else {
        return (this.getCurrentFloorElevador - this.firstFloorCalling()) > (this.lastFloorCalling() - this.getCurrentFloorElevador) ?
          'up' : 'down'
      }
    } else {
      return 'stationary'
    }
  }

  // Stop until the sensor releases, simulates a stop time of one second.
  // If there are still more floors that we need to visit that are in the same direction, keep going in that direction.
  // If not and there are still floors we need to visit, move in that direction.
  // For simplicity and for execution not to delay, i will not call this function.
  async stopToSensorRelases() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  }

  // Passengers who are on one floor and above are rising.
  passengersAboveRising () {
    var flagToUp = false
    for (var i of this.passengersWaiting.toArray()) {
      if (i.to > i.from && i.from == this.currentFloorElevador) {
        this.passengersInTheElevator.push(i)
        this.deletePassengersWaiting(i)
      } else if (i.from > this.currentFloorElevador) {
        flagToUp = true
      }
    }

    var nearestPassengerToUp = this.nearestPassengerToUp()
    if (nearestPassengerToUp && nearestPassengerToUp.to == this.getCurrentFloorElevador) {
      this.deletePassengersInTheElevator(nearestPassengerToUp)
    }

    if (this.passengersInTheElevator.length > 0 || flagToUp) {
      return 'up'
    } else {
      return false
    }
  }

  // Passengers are on one floor below and are descending.
  passengersBelowDescending () {
    var flagToDown = false
    for (var i of this.passengersWaiting.toArray()) {
      if (i.to < i.from && i.from == this.currentFloorElevador) {
        this.passengersInTheElevator.push(i)
        this.deletePassengersWaiting(i)
      } else if (i.from < this.currentFloorElevador) {
        flagToDown = true
      }
    }

    var nearestPassengerToDown = this.nearestPassengerToDown()
    if (nearestPassengerToDown && nearestPassengerToDown.to == this.getCurrentFloorElevador) {
      this.deletePassengersInTheElevator(nearestPassengerToDown)
    }

    if (this.passengersInTheElevator.length > 0 || flagToDown) {
      return 'down'
    } else {
      return false
    }
  }
}

module.exports = Elevador
