import React from "react";
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import Response from "../response";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import SearchIcon from "@material-ui/icons/Search";
import {
  Description,
  Image,
  LocalOffer,
  MoreVert,
  Room,
} from "@material-ui/icons";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();
  const { data } = useGoogleSearch(term);

  //const data = Response;

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="google logo"
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons />
          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage__option">
                <Description />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage__option">
                <Image />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage__option">
                <LocalOffer />
                <Link to="/shopping">shopping</Link>
              </div>
              <div className="searchPage__option">
                <Room />
                <Link to="/maps">maps</Link>
              </div>
              <div className="searchPage__option">
                <MoreVert />
                <Link to="/more">more</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage__option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data ? data.searchInformation.formattedTotalResults : null}{" "}
            results ({data ? data.searchInformation.formattedSearchTime : null})
            for {term}
          </p>
          {data
            ? data.items.map((item) => (
                <div className="searchPage__result">
                  <a href={item.link}>
                    {item.pagemap
                      ? item.pagemap.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src && (
                          <img
                            className="searchPage__resultImage"
                            src={item.pagemap?.cse_image[0]?.src}
                            alt="link_image"
                          />
                        )
                      : null}{" "}
                    {item.displayLink}
                  </a>
                  <a className="searchPage__resultTitle" href={item.link}>
                    <h3>{item.title}</h3>
                  </a>
                  <p className="searchPage__resultSnippet">{item.snippet}</p>
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
