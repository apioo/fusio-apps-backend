'use strict'

module.exports = function ($uibModal) {
  var helper = {}

  helper.showDialog = function (path) {
    $uibModal.open({
      size: 'lg',
      template: '<div class="modal-body"><iframe src="https://docs.fusio-project.org/docs/backend/' + path + '" width="100%" height="600px"></iframe></div>'
    })
  }

  return helper
}
