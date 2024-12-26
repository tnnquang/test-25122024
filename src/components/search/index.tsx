import { Formik } from "formik";
import { useState } from "react";
import SearchIcon from "../../assets/search.svg";
import { formatKey, sleep } from "../../helpers/ultils";
import { ThreeDot } from "react-loading-indicators";

export default function SearchComponent() {
  const [state, setState] = useState<{
    loading: boolean;
    data: null | undefined | any;
  }>({
    loading: false,
    data: null,
  });

  const updateState = (loading: boolean, data: any) => {
    setState({ loading, data });
  };

  const handleSubmitSearch = async (values: { keyword: string }) => {
    // console.log("kkkkkk", values);
    if (!values.keyword) return null;
    updateState(true, null);
    try {
      const response = await fetch(
        `https://api.github.com/users/${values.keyword}`,
        {
          method: "GET",
          headers: {
            Connection: "Keep-Alive",
            "Keep-Alive": "timeout=30, max=100",
          },
        }
      );
      if (response.ok) {
        const jsonData = await response.json();

        if (jsonData.login) {
          updateState(false, jsonData);
          return null;
        }
      }
      updateState(false, undefined);
      return null;
    } catch (error) {
      updateState(false, undefined);
      console.log("Error fetching data user: ", error);
    }
  };

  return (
    <section className="search-container max-w-[1280px] mx-auto pt-20 pb-40">
      <Formik
        initialValues={{
          keyword: "",
        }}
        validate={(values) => {
          const errors: { [key: string]: string[] } = {};
          const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;
          if (!regex.test(values.keyword)) {
            errors.keyword = [
              "The keyword must have at least 1 character and start with a letter or number, and can be up to 38 characters long.",
              "Only letters, numbers, or hyphens are accepted, but it must end with a letter or number.",
            ];
          }
          return errors;
        }}
        onSubmit={(values) => {
          handleSubmitSearch(values);
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, touched, errors }) => (
          <form
            onSubmit={handleSubmit}
            className="relative rounded-xl bg-primary bg-opacity-25 text-white py-3 lg:p-5 xl:p-10"
          >
            <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-bold leading-[80px] mb-4">
              Explore Your Github User
            </h1>

            <div className="relative w-full">
              <input
                name="keyword"
                id="keyword"
                placeholder="Input your search"
                className="w-full py-3.5 pl-3.5 pr-14 rounded-full text-gray-700"
                onChange={async (e) => {
                  handleChange(e);
                  await sleep(0.3);
                  handleSubmit();
                }}
                onBlur={handleBlur}
                autoFocus
              />
              <button
                className="btn-search mt-[5px] absolute right-2 rounded-full w-max p-2 transtion-all duration-300 bg-[#32cd32] hover:bg-opacity-80"
                type="submit"
              >
                <SearchIcon />
              </button>
            </div>
            {errors.keyword &&
              touched &&
              (Array.isArray(errors.keyword) ? errors.keyword : []).map(
                (str, i) => (
                  <span
                    key={i}
                    className=" block text-xs md:text-sm text-red-600 italic mt-2"
                  >
                    {str}
                  </span>
                )
              )}
          </form>
        )}
      </Formik>
      <div className="content-data">
        {state.loading ? (
          <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
        ) : state.data === undefined ? (
          <p className="text-white text-base text-center">
            User not found. Please type any username
            {state.data}
          </p>
        ) : state.data !== undefined && state.data !== null ? (
          <a
            href={`/detail/${state.data.login}`}
            className="block text-left text-white w-fit mx-auto rounded-md bg-gray-500 bg-opacity-25 hover:bg-opacity-35 p-3"
          >
            <p className="hover:text-opacity-80 truncate">
              <strong>Keyword</strong>:{" "}
              <span className="text-wrap text-ellipsis">
                {state.data.login}
              </span>
            </p>
            <p className="hover:text-opacity-80 truncate">
              <strong>ID</strong>:{" "}
              <span className="text-wrap text-ellipsis">{state.data.id}</span>
            </p>
            <p className="hover:text-opacity-80 truncate">
              <strong>Github URL</strong>:{" "}
              <span className="text-wrap text-ellipsis">
                {state.data.html_url}
              </span>
            </p>
            {/* {Object.keys(state.data).map((key) => {
              if (state.data[key] && state.data[key] != 0) {
                return (
                  <p className="hover:text-opacity-80 truncate" key={key}>
                    <strong>{formatKey(key)}</strong>:{" "}
                    <span className="text-wrap text-ellipsis">
                      {state.data[key]}
                    </span>
                  </p>
                );
              }
              return null;
            })} */}
          </a>
        ) : null}
      </div>
    </section>
  );
}
