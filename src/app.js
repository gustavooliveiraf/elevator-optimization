var Elevador = require('./classes/Elevador')
var Passageiro = require('./classes/Passageiro')
var questao = require('../questions/questions')

var objPassageiro = new Passageiro(questao[process.argv[2]].list)
var objElevador = new Elevador(questao[process.argv[2]].floorInitialElevator,objPassageiro.getList)

var count = 0
var flag = 'stationary'

while (true) {
  if (objPassageiro.getListChanged) {                        // always renews the list in
    objElevador.setPassengersWaiting = objPassageiro.getList // search of new passengers.
  }

  var upOrDown = objElevador.upOrDown(upOrDown)

  if (upOrDown !== 'stationary') {
    if (upOrDown === 'up') {
      var res = 'up'
      while (res === 'up') {
        if (objPassageiro.getListChanged) {
          objElevador.setPassengersWaiting = objPassageiro.getList
        }

        res = objElevador.passengersAboveRising()

        if (res === 'up') {
          count++; objElevador.increaseCurrentFloorElevador()
        } else {
          break
        }
      }
    } else if (upOrDown === 'down') {
      var res = 'down'
      while (res === 'down') {
        if (objPassageiro.getListChanged) {
          objElevador.setPassengersWaiting = objPassageiro.getList
        }

        res = objElevador.passengersBelowDescending()

        if (res === 'down') {
          count++; objElevador.decreaseCurrentFloorElevador()     
        } else {
          break
        }
      }
    }
  } else {
    if (flag) {
      console.log('---------------------------------------------------------------')
      console.log('Todos passageiros foram levados. Esperando mais solicitações...')
      console.log(count + ' andares percorridos até o momento.')
      console.log('---------------------------------------------------------------\n')
      flag = false
    }
  }
}
