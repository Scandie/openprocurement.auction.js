angular.module('auction').controller('ArchiveController', [
  'AuctionConfig', '$scope', '$http', '$location',
  function(AuctionConfig, $scope, $http, $location) {
  /*@ngInject;*/
  var startid = false;

  var params = $location.search();
  console.log(params);

  var offset = params.offset || (new Date()).getTime() * 1000;
  var startkey_docid = params.startid || '';

  $http({
    method: 'GET',
    url: AuctionConfig.db_url + '/_design/auctions/_view/by_endDate',
    cache: true,
    params: {
      include_docs: true,
      startkey: offset,
      startkey_docid: startkey_docid,
      limit: 101,
      descending: true,
    },
  }).then(function(resp) {
    $scope.auctions = resp.data.rows;
  });

  offset = false;

  if (($scope.auctions || []).lenght > 100) {
    offset = $scope.auctions[100].key;
    startid = $scope.auctions[100].id;
  }
  $scope.offset = offset;
  $scope.startid = startid;
}])