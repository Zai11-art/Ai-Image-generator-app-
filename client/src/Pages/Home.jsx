import { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../Components";
import FormFieldSearch from "../Components/FormFieldSearch";

const RenderCards = ({data, title}) => {
    if (data?.length > 0) {
        return (
            data.map((post) => <Card key={post._id} {...post}/>)
        )
    }

    return (
        <h2 className="mt-5 font-bold text-xl text-center">{title}</h2>
    )
}



function Home() {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);
 
    const fetchPosts = async () => {
        setLoading(true);
    
        try {
          const response = await fetch('http://localhost:8080/api/v1/post', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const result = await response.json();
            setAllPosts(result.data.reverse());
          }
        } catch (err) {
          alert(err);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchPosts();
      }, []);
    
      const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);

        setSearchText(e.target.value);

        setSearchTimeout(
          setTimeout(() => {
            const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) 
            || item.prompt.toLowerCase().includes(searchText.toLowerCase()))
            setSearchedResults(searchResult);
          }, 500),
        );
      };

    return ( 
    <section className="flex flex-col text-[white] bg-[#002B5B]">
        <div className="text-center pt-[50px]">
            <h1 className="font-bold text-4xl">WORKS</h1>
            <p className="text-lg py-2">Here we are about to witness the use of DALL-E AI
            across different prompters.</p>
        </div>

        <div className="mt-5 flex flex-col items-center text-[white]">
            <FormFieldSearch
              labelName="Search Posts"
              type='text'
              name='text'
              placeholder="Search posts"
              value={searchText}
              handleChange={handleSearchChange}
            />
        </div>

        <div className="flex justify-center flex-col items-center text-white bg-[#002B5B]">
            {loading ? (
                <Loader/>
            ) : (
               <>
                {searchText && (
                    <h2 className="font-medium text-xl mt-5 text-[white]">
                        Showing prompted art for: 
                        <span className="text-red">{searchText}</span>
                    </h2>
                )}
                <div className="w-full flex items-center justify-center flex-row flex-wrap">
                    {searchText ? (
                        <RenderCards 
                        data={searchedResults}
                        title="No search results found"
                        />
                    ): (
                        <RenderCards
                        data={allPosts}
                        title="No posts found"
                        />
                    )}
                </div>
               </>
            )}
        </div>
        
    </section>
     );
}

export default Home;