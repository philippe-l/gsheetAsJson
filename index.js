function getGsheetAsJson (spreadSheetId) {
  const SHEET_ID = spreadSheetId; //

  var ss = SpreadsheetApp.openById(SHEET_ID);
  const SHEETS = ss.getSheets() ;

  // création des modèls à partir des feuilles
  const models = [];
  SHEETS.forEach(s => {
    const modelName = s.getName();
   
    models.push({
      [modelName]: [],
      sheetIndex: s.getIndex(),
      modelName: modelName
    });    

  });

  models.forEach(m => {

    const modelSheet = ss.getSheetByName(m.modelName);

    const modelValues = modelSheet.getRange(1, 1, modelSheet.getMaxRows(), modelSheet.getMaxColumns()).getValues();
    const modelProperties = modelValues[0]; 
    modelValues.shift(); // on retire l'entête
    const objs = [];
    modelValues.forEach((v) => {
        
        const obj = {};
        v.forEach((e, index) => (
          obj[modelProperties[index]] = e
        ))

        objs.push(obj);

    });

    models[m.modelName] = objs;

  });
  
  return models;
  
}
