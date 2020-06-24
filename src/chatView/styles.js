const styles = theme => ({

  content: {
    overflowY: 'scroll',
    height: '500px',
    marginTop: '25px'

  },

  userSent: {

    paddingLeft: '20px',
    paddingRight: '20px',
    marginLeft: '400px',
    marginTop: '25px',
    backgroundColor: '#99ccff',
    fontSize: '25px',
    borderRadius: '10px',
    clear: 'both',
    textAlign: 'center',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    width: '50%',
    fontFamily: 'cursive',
},

  friendSent: {
    paddingLeft: '20px',
    paddingRight: '20px',
    width: '50%',
    textAlign: 'center',
    fontFamily: 'cursive',

    marginLeft: '50px',
    marginTop: '25px',
    backgroundColor: '#b3ffb3',
    fontSize: '25px',
    borderRadius: '10px',
    clear: 'both',
    boxSizing: 'border-box',
    wordWrap: 'break-word',


  },

  chatHeader: {
    textAlign: 'center',
    borderRadius: '10px',
    backgroundColor: '#ff99cc',
    width: '100%',
    height: '38px'
  }

});
export default styles;  