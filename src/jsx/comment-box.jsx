var CommentBox = React.createClass({

  componentDidMount: function() {
    this.unsubscribe = commentStore.listen(this.onCommentAdded);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  getInitialState: function() {
    return { data: commentStore.comments };
  },

  onCommentAdded: function(comment) {
    this.setState({ data: commentStore.comments });
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={ this.state.data } />
        <CommentForm />
      </div>
    );
  }

});

function initCommentBox() {
  React.render(
    <CommentBox />,
    document.getElementById('content')
  );
}
