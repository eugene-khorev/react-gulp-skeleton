var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

function initCommentBox() {
  var el = document.getElementById('content');
  var attr = el.attributes['data-comments'];
  var comments = JSON.parse(attr.value);
  
  React.render(
    <CommentBox data={comments} />,
    document.getElementById('content')
  );
};