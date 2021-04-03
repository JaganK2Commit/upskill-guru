export const barChartDataMapping = (chartArrayData) =>{
    const uniqueArrayWithCounts = chartArrayData.reduce((row, val) => {
        const dupeIndex = row.findIndex(arrayItem => arrayItem.skill_name === val.skill_name);

        if (dupeIndex === -1) {
          // Not found, so initialize.
          row.push({
            freq: 1,
            skill_name:val.skill_name
          });
        } else {
          // Found, so increment counter.
          row[dupeIndex].freq++;
        }
        return row;
    }, []);
    return uniqueArrayWithCounts
}