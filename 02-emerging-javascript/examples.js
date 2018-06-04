var tahoe = () => {
    var tahoe = {
      resorts: ["Kirkwood", "Squaw", "Alpine", "Heavenly", "Northstar"],
      // try changing this to and from an arrow function to see how the scope changes!
      print: function(delay=1000) {
  
        setTimeout( () => {
          console.log( this );
          console.log( this.resorts.join(", ") )
        }, delay)
      }
    }
    return tahoe;
  }
  
  var lordify = ({firstname}) => {
    var titles = ['Count', 'Baron', 'Duchess', 'Sir', 'Lord', 'Duke', 'Marquis', 'His/Her Exquisite Awfulness'];
    var realm = ['Schnozzleberry', 'Wingleton', 'Twiddleshire', 'Frodendorf', 'Wetfurt', 'Perreis', 'Chavereaux'];
    var connector = ['von', 'of', 'de'];
    
    var randSelect = function (selection) { return selection[ Math.floor(Math.random() * selection.length ) ] };
    
    return `${randSelect(titles)} ${firstname} ${randSelect(connector)} ${randSelect(realm)}`
  }
  
  var getFakeMembers = count => new Promise((resolves, rejects) => {
    const api = `https://api.randomuser.me/?nat=US&results=${count}`
    const request = new XMLHttpRequest()
    request.open('GET', api)
    request.onload = () =>
      (request.status === 200) ? 
        resolves(JSON.parse(request.response).results) :
        reject(Error(request.statusText))
    request.onerror = (err) => rejects(err)
    request.send()
  })