module.exports = (app) => {
  // Your code here
  app.log('Yay! The app was loaded!')

  // example of probot responding 'Hello World' to a new issue being opened
  app.on('issues.opened', async context => {
    context.log(context.payload)
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
    const params = context.issue({body: 'Hello '+ context.payload.issue.user.login +'!'})
    //const params = context.issue({body: JSON.stringify(context)})

    // Post a comment on the issue
    context.github.issues.createComment(params);
    
    let labelsToAdd = [];
    labelsToAdd.push("awesome");
    return context.github.issues.addLabels(context.issue({ labels: labelsToAdd }))
  })
}
