module.exports = app => {
  app.log("The app was loaded!");
  
  //  app.on(`*`, async context => {
  //   context.log({ event: context.event, action: context.payload })
  // })

  app.on(['issues.opened', 'issues.edited'], async context => {
    let labelsToAdd = [];

    const title = context.payload.issue.title;
    app.log("Title: ", title);
    
    let matches = title.match(/\[(.*?)\]/g);
    matches.forEach(match => {
      let tag = match.substring(
        match.lastIndexOf("[") + 1,
        match.lastIndexOf("]")
      );
      
      labelsToAdd.push({ name: tag, color: "005668" });
    });

    
    return context.github.issues.addLabels(      
      context.issue({ labels: labelsToAdd })
    );
  });
};
