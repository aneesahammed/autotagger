module.exports = app => {
  app.log("Yay! The app was loaded!");

  app.on("issues.opened", async context => {
    let labelsToAdd = [];

    let matches = context.payload.issue.title.match(/\[(.*?)\]/g);
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
