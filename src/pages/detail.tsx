import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { useParams } from "react-router-dom";

export default function DetailPage() {
  const { slug } = useParams();
  const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;
  const [dataUser, setDataUser] = useState<any>(null);
  const getDataUser = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${slug}/repos`, {
        headers: {
          "Keep-Alive": "timeout-30, max=100",
        },
      });
      if (res.ok) {
        const json = await res.json();
        setDataUser(json);
        return;
      }
      setDataUser(undefined);
      return;
    } catch (error) {
      setDataUser(undefined);
    }
  };

  useEffect(() => {
    if (!slug) return;
    getDataUser();
  }, [slug]);

  if (!slug || !regex.test(slug))
    return (
      <p className="text-xl font-bold text-center text-white py-40">
        The username is not in the correct format, please check it again.
      </p>
    );
  if (dataUser === undefined) {
    <p className="text-xl font-bold text-center text-white py-40">
      Data repos are empty.
    </p>;
  }
  return (
    <section className="detail-container pt-20 pb-40 text-white mx-auto lg:px-5 xl:px-10">
      <div className="max-w-[1280px] p-2 sm:p-4 rounded-xl bg-gray-500 bg-opacity-30">
        <h2 className="mb-3 text-xl font-semibold text-center">
          List repos of the username <strong>{slug}</strong>
        </h2>
        <ul className="mx-auto">
          {dataUser == null ? (
            <div className="mt-3">
              <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
            </div>
          ) : (
            dataUser.map((el: any, k: number) => (
              <li
                key={k}
                className="text-left relative flex items-center gap-2 group transition-all duration-200"
              >
                <span className="line-clamp-1 group-hover:bg-blue-600 p-1 rounded-full bg-white inline-flex mr-2"></span>
                <a
                  href={el.html_url}
                  className="w-full block py-2 hover:text-blue-300 truncate "
                  target="_blank"
                >
                  {el.name}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
