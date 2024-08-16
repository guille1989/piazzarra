import * as React from "react";
import { useEffect } from "react";
import {
  HeatMapComponent,
  Legend,
  Tooltip,
  Inject,
  Adaptor,
} from "@syncfusion/ej2-react-heatmap";

const Default = () => {
  const load = (args) => {};
  const getDatasource = () => {
    let temp = {};
    temp.dataSource = [];
    temp.xAis = [];
    temp.yAis = [];
    for (let x = 0; x < 31; x++) {
      temp.dataSource.push([]);
      temp.xAis.push(x);
      temp.yAis.push(x);
      for (let y = 0; y < 10; y++) {
        temp.dataSource[x].push(getRndInteger(-10, 10));
      }
    }
    return temp;
  };
  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  let paletteSettings = {
    palette: [
        { color: '#d00000' },
        { color: '#d00000' },
        { color: '#ccff33' }
    ]
};

  return (
    <main>
      <div className="control-pane">
        <div className="control-section">
          <HeatMapComponent
            id="heatmap-container"
            titleSettings={{
              text: "Control y seguimiento de insumos - Carnes",
              textStyle: {
                size: "15px",
                fontWeight: "500",
                fontStyle: "Normal",
                fontFamily: "inherit",
              },
            }}
            xAxis={{
              textStyle: { fontFamily: "inherit" },
            }}
            yAxis={{
              textStyle: { fontFamily: "inherit" },
            }}
            cellSettings={{ textStyle: { fontFamily: "inherit" } }}
            tooltipSettings={{ textStyle: { fontFamily: "inherit" } }}
            legendSettings={{ textStyle: { fontFamily: "inherit" } }}
            load={load}
            dataSource={getDatasource().dataSource}
            paletteSettings={paletteSettings}
          >
            <Inject services={[Legend, Tooltip, Adaptor]} />
          </HeatMapComponent>
        </div>
      </div>
    </main>
  );
};
export default Default;
