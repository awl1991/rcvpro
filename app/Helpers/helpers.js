// Helper Functions
consoleF = (description, json) => {
  var vLines = ''
  for(var  i = 0; i <= description.length; i++){
    vLines += "─";
  }

  var data = JSON.stringify(json, null, "┋" + "\t");


  return console.log(
    `
                   ==> [ ${"OUTPUT"} ] <==
                 ╭───────${vLines}──╮
╭────────────────┤     ${description}     │
│                ╰───────${vLines}──╯
│ ${data}
╰────────────────${vLines}────────────────
`
  );
}


export default consoleF
