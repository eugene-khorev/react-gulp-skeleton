var commentStore = Reflux.createStore({

  init: function () {
    this.comments = data.comments;

    this.listenTo(CommentActions.commentAdded, this.handleCommentAdded);
  },

  handleCommentAdded: function (comment) {
    this.comments.push(comment);

    this.trigger(comment);
  }

});
