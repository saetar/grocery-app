var SortingUtils = {
  sortByCreateDate: function (a,b) {
    return a.sortDate > b.sortDate ? 1 : 0;
  },
};

module.exports = SortingUtils;
