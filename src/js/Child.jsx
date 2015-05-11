var Child = React.createClass({
  render: function(){
    return (
      <div>
        and this is the mother fucking <b>{this.props.name}</b>.
      </div>
    )
  }
});
 
module.exports = Child;