import { useState } from "react";
import { DropdownButton } from "../components/dropdown";
import axios from "axios"
import { useCookies } from "react-cookie";
const years = [2018, 2019, 2020, 2021, 2022, 2023,2024,2025,2026];
const states= ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka',
'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
'Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu','Lakshadweep','Delhi','Puducherry'];
const diseases = ['Dengue', 'Malaria', 'Chikungunya'];

export const UpdateEntry = () => {
    const [selectedYear, setSelectedYear] = useState("Year");
    const [isYearDropdownOpen, setYearDropdownOpen] = useState(false);
    
    const [selectedDisease, setSelectedDisease] = useState("Disease");
    const [isDiseaseDropdownOpen, setDiseaseDropdownOpen] = useState(false)

    const [selectedState, setSelectedState] = useState("State");
    const [isStateDropdownOpen, setStateDropdownOpen] = useState(false);

    const [cases, setCases] = useState(0)
    const [deaths, setDeaths] = useState(0)

    const [cookies, _] = useCookies(["access_token"])
    const sendData = async (req, res) => {
        const statesMap = new Map([["State", "State"],['Andhra Pradesh' , "AP" ], ['Arunachal Pradesh' , "AR" ], ['Assam' , "AS"], ['Bihar' , "BR"], ['Chhattisgarh' , "CG"],['Goa' , "GA"],['Gujarat' ,"GJ" ],['Haryana' , "HR"],['Himachal Pradesh' , "HP"],['Jammu and Kashmir' , "JK"],['Jharkhand' , "JH"],['Karnataka' ,"KA" ],
      ['Kerala' , "KL"],['Madhya Pradesh' , "MP"],['Maharashtra' , "MH"],['Manipur' , "MN" ],['Meghalaya' , "ML" ],['Mizoram' , "MZ"],['Nagaland' , "NL"],['Odisha' , "OD" ],['Punjab' , "PB"],['Rajasthan' , "RJ"],['Sikkim' , "SK"],['Tamil Nadu' , "TN"],['Telangana' , "TS"],['Tripura' , "TR"],['Uttar Pradesh' , "UP"],['Uttarakhand' , "UK"],['West Bengal' , "WB"],
      ['Andaman & Nicobar Islands' , "AN"],['Chandigarh' , "CH"],['Dadra & Nagar Hveli and Daman & Diu' , "DD" ],['Lakshadweep' , "LD"],['Delhi' , "DL"],['Puducherry',"PY"]]);
      
        const data = {
          "disease": selectedDisease,
          "year": selectedYear,
          "state": statesMap.get(selectedState),
          "cases": cases,
          "deaths": deaths
        };
        try {
          const response = await axios.post('http://localhost:3001/update/', 
          data,
          {headers: {authorization: cookies.access_token}}
          );

          console.log(response.data)
          if (Boolean(response.data.login_alert)) alert("Please Login First before updating data")
          if (Boolean(response.data.alert)) {
            alert("Data has been updated")
          }
          else {
            alert("Could not update data")
          }
        
        } catch (error) {
          console.error(error);
        };
      };
    return <div>
        <h3>UPDATE THE DISEASE DATA</h3>
        <DropdownButton
          items={years}
          setSelectedItem={setSelectedYear}
          selectedItem={selectedYear}
          setIsDropdownOpen={setYearDropdownOpen}
          isDropdownOpen={isYearDropdownOpen}
        />

        <DropdownButton
          items={states}
          setSelectedItem={setSelectedState}
          selectedItem={selectedState}
          setIsDropdownOpen={setStateDropdownOpen}
          isDropdownOpen={isStateDropdownOpen}
        />

        <DropdownButton
          items={diseases}
          setSelectedItem={setSelectedDisease}
          selectedItem={selectedDisease}
          setIsDropdownOpen={setDiseaseDropdownOpen}
          isDropdownOpen={isDiseaseDropdownOpen}
        />
        <div className="form-group">
          <label htmlFor="cases">Cases:</label>
          <input
            type="number"
            id="cases"
            value={cases}
            onChange={(event) => setCases(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deaths">Deaths:</label>
          <input
            type="number"
            id="deaths"
            value={deaths}
            onChange={(event) => setDeaths(event.target.value)}
          />
        </div>
        <button onClick={sendData}>Update Data</button>

        <form></form>
    </div>
};