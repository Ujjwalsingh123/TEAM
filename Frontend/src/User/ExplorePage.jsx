import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import Hero_Vdo1 from "../../public/Hero_Vdo1.mp4";

const ExplorePage = () => {
  const navigate = useNavigate();
  const [uploadedDocuments, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.post("http://52.66.174.249:4001/user/Documents");
        if (res.data) {
          setDocuments(res.data.docs);
          setFilteredDocuments(res.data.docs);
        }
      } catch (err) {
        console.error(err.response || err.message);
      }
    };

    fetchDocuments();
  }, []);
  useEffect(() => {
    handleSearch();
  }, [startDate, endDate, sortOrder]);
  
  

  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  

  const handleSearch = () => {
    let filtered = [...uploadedDocuments];
  
    // Filter by Class Type
    if (selectedClassType && selectedClassType !== "All") {
      filtered = filtered.filter(
        (doc) =>
          stripHTML(doc.Class).toLowerCase() === selectedClassType.toLowerCase()
      );
    }
  
    // Filter by Date Range
    if (startDate && endDate) {
      filtered = filtered.filter((doc) => {
        const docDate = new Date(doc.uploadDate);
        return docDate >= new Date(startDate) && docDate <= new Date(endDate);
      });
    }
  
    // Filter by Search Query (strict exact match)
    if (searchQuery) {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((doc) => {
        const normalizedTitle = doc.title.trim().toLowerCase();
        return normalizedTitle === normalizedQuery;
      });
    }
    
    // Sort Documents
    if (sortOrder) {
      filtered.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return sortOrder === "A-Z"
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
    }
  
    // Update the filtered documents
    setFilteredDocuments(filtered);
  };
  

  const handleViewMore = (doc) => {
    const newTab = window.open(`/document-details/${doc._id}`, "_blank");
    newTab.focus();
  };
 


  return (
    <div className="bg-gray-100 text-gray-900 mt-[65px]">
      <header className="bg-blue-800 text-white">
      
        <div className="hero min-h-[470px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={Hero_Vdo1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="w-full hero-content text-neutral-content text-center relative z-10">
            <div className="w-[90%] md:w-[80%] mx-auto px-4 py-4 text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Explore Research Articles and Journals
              </h1>
              <p className="text-sm md:text-lg text-center mb-6">
                Access thousands of high-quality research papers and articles.
              </p>
              

              <div className="flex flex-col items-center space-y-4 w-full mx-auto">
                
                <div className="flex items-center w-full space-x-[1px]">
                  
                  <select
                    className="px-2 py-2 text-gray-800 border border-gray-300 rounded-l-md bg-gray-200 h-full text-xs sm:text-sm sm:px-4 sm:py-4"
                    value={selectedClassType}
                    onChange={(e) => setSelectedClassType(e.target.value)}
                    
                  
                  >
                    <option value="All">All</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Civil">Civil</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Administration">Administration</option>
                  </select>

                  
                    <div className="w-full bg-white">
                      <Autocomplete
                        id="custom-input-demo"
                        freeSolo
                        options={uploadedDocuments.map((doc) => doc.title.trim())}
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref} className="w-full">
                            <TextField
                              {...params}
                              placeholder="Search for articles, authors, or topics..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value.trim())} // Update only the searchQuery state
                              
                              variant="outlined"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  padding: '2px',
                                  fontSize: '12px',
                                  '@media (min-width: 640px)': {
                                    padding: '8.20px',
                                    fontSize: '16px',
                                  },
                                },
                              }}
                              className="w-full text-xs sm:text-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}
                        onInputChange={(event, value) => setSearchQuery(value.trim())}
                      />
                    </div>


                  <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-orange-500 text-white px-2 py-[10.5px] text-xs sm:px-4 sm:py-[19.2px] rounded-r-md hover:bg-orange-600"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                  <div>
                    <label className="block text-white text-sm md:text-base">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      
                        
                    
                      className="px-4 py-2 text-gray-800 border border-gray-300 rounded-md w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm md:text-base">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      
                      
                      className="px-4 py-2 text-gray-800 border border-gray-300 rounded-md w-full"
                      
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm md:text-base">
                      Sort By
                    </label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="px-4 py-2 text-gray-800 border border-gray-300 rounded-md w-full"
                      
                    
                    >
                      <option value="A-Z">A-Z</option>
                      <option value="Z-A">Z-A</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </header>

      <main>
  <div className="p-6 bg-white shadow-lg dark:bg-[#222] rounded-lg shadow-md p-8">
    {filteredDocuments.length > 0 ? (
      <div className="space-y-6">
        {filteredDocuments.map((doc) => (
          <div
            key={doc._id}
            className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col dark:bg-black"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {doc.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-white">
              <strong>Uploaded Date:</strong> {doc.uploadDate}
            </p>
            <p className="text-sm text-gray-700 dark:text-white">
              <strong>Class:</strong> {stripHTML(doc.Class) || "Unclassified"}
            </p>
            <p className="text-sm text-gray-700 dark:text-white">
              <strong>Summary:</strong>{" "}
              {stripHTML(doc.summary) || "No summary available."}
            </p>
            <div className="flex justify-start">
              <button
                onClick={() => handleViewMore(doc)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-500 dark:text-white">
        No document available
      </div>
    )}
  </div>
</main>



    </div>
  );
};

export default ExplorePage;