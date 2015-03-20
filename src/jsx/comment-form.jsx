var CommentForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();

    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();

    if (!text || !author) {
      return;
    }

    Actions.commentAdded.trigger({ author: author, text: text });

    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';

    return;
  },

  render: function() {
    return (
      <div className="commentForm">
        <form className="commentForm" onSubmit={ this.handleSubmit }>
          <input type="text" name="author" ref="author" />
          <input type="text" name="comment" ref="text" />
          <input type="submit" value="add" />
        </form>
      </div>
    );
  }

});
