import {react, useState} from "react"
import axios from "axios"

// import { DropdownButton } from "../components/dropdown";
const DropdownButton = ({ items, setSelectedItem, selectedItem, setIsDropdownOpen, isDropdownOpen }) => {
    const handleItemClick = (item) => {
      setSelectedItem(item);
      setIsDropdownOpen(false);
    };
  
    return (
      <div className="mr-5" style={{ marginLeft: '60vw' }}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="py-2 px-4 bg-gray-200 hover:bg-gray-400 block whitespace-no-wrap"
        >
          {selectedItem || 'Select'}
        </button>
        {isDropdownOpen && (
          <div className="dropdownBox">
            <ul>
              {items.map((item) => (
                <li
                  key={item}
                  className="hover:bg-gray-100 p-2 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };


export const Display = () => {
    const url = "http://localhost:3001";
    
    const years = [2018, 2019, 2020, 2021, 2022, 2023];
    const states= ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka',
    'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
    'Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Hveli and Daman & Diu','Lakshadweep','Delhi','Puducherry'];
    const diseases = ['Dengue', 'Malaria', 'Chikungunya'];
    const [selectedYear, setSelectedYear] = useState("Year");
    const [isYearDropdownOpen, setYearDropdownOpen] = useState(false);
    
    const [selectedDisease, setSelectedDisease] = useState("Disease");
    const [isDiseaseDropdownOpen, setDiseaseDropdownOpen] = useState(false)

    const [selectedState, setSelectedState] = useState("State");
    const [isStateDropdownOpen, setStateDropdownOpen] = useState(false);
    const [cdCount, setCdCount] = useState([])

    const handleSend = async (req, res) => {
      const statesMap = new Map([["State", "State"],['Andhra Pradesh' , "AP" ], ['Arunachal Pradesh' , "AR" ], ['Assam' , "AS"], ['Bihar' , "BR"], ['Chhattisgarh' , "CG"],['Goa' , "GA"],['Gujarat' ,"GJ" ],['Haryana' , "HR"],['Himachal Pradesh' , "HP"],['Jammu and Kashmir' , "JK"],['Jharkhand' , "JH"],['Karnataka' ,"KA" ],
    ['Kerala' , "KL"],['Madhya Pradesh' , "MP"],['Maharashtra' , "MH"],['Manipur' , "MN" ],['Meghalaya' , "ML" ],['Mizoram' , "MZ"],['Nagaland' , "NL"],['Odisha' , "OD" ],['Punjab' , "PB"],['Rajasthan' , "RJ"],['Sikkim' , "SK"],['Tamil Nadu' , "TN"],['Telangana' , "TS"],['Tripura' , "TR"],['Uttar Pradesh' , "UP"],['Uttarakhand' , "UK"],['West Bengal' , "WB"],
    ['Andaman & Nicobar Islands' , "AN"],['Chandigarh' , "CH"],['Dadra & Nagar Hveli and Daman & Diu' , "DD" ],['Lakshadweep' , "LD"],['Delhi' , "DL"],['Puducherry',"PY"]]);

      const data = {
        "disease": selectedDisease,
        "year": selectedYear,
        "state": statesMap.get(selectedState)
      };
      try {
        const response = await axios.post('http://localhost:3001/display/', data);
        if (response.data != null) setCdCount(response.data)
        else {
          alert("Data not found!")
        }
      } catch (error) {
        console.error(error);
      };
    };
    
    return (
      <div>
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

        <button className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded" onClick={handleSend}>Get Data</button>
        <p>Cases: {cdCount.cases}</p>
        <p>Deaths:  {cdCount.deaths}</p> 
      </div>
    );
    // return <div>
    
    // </div>
};