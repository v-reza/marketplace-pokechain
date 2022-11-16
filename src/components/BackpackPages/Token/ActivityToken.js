import { useAxios } from "@/utils/axiosInstance";
import moment from "moment";
import Image from "next/image";
import { useQuery } from "react-query";
import { getActivityToken } from "../schema/query";
import bgToken from "@/dist/token.png";
import useUser from "@/hooks/useUser";

export default function ActivityToken() {
  const axiosInstance = useAxios();
  const { currentUser } = useUser();

  const { data: activityToken, isLoading } = useQuery({
    queryKey: "activityToken",
    queryFn: () => getActivityToken(axiosInstance),
  });

  const RenderStatus = (status) => {
    if (status === "convert") {
      return (
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Convert
          </span>
        </td>
      );
    } else if (status === "sell") {
      return (
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-rose-100 text-rose-800">
            Sell
          </span>
        </td>
      );
    } else if (status === "withdraw") {
      return (
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
            Withdraw
          </span>
        </td>
      );
    }
  };
  return (
    <div className="flex flex-col mt-8">
      <h3 className="text-lg leading-6 font-medium text-white">
        Activity Token
      </h3>
      <div
        className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2"
        id="scroll_none"
      >
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow shadow-gray-800 overflow-hidden border-b border-gray-600 rounded-md sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Activity ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Old Volume
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    New Volume
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-700">
                {!isLoading &&
                  activityToken?.map((item, i) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold text-white">
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {item.activity_id}
                      </td>
                      {RenderStatus(item.status)}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-300">
                          ${parseFloat(item.old_volume_balance).toFixed(2)}{" "}
                          {item.new_volume_balance > item.old_volume_balance ? (
                            <span className="text-green-500">
                              +
                              {parseFloat(
                                item.new_volume_balance -
                                  item.old_volume_balance
                              ).toFixed(2)}
                              $
                            </span>
                          ) : (
                            <span className="text-red-500 ml-2">
                              {item.new_volume_balance -
                                item.old_volume_balance}
                              $
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-slate-300 flex items-center">
                          <Image
                            src={bgToken}
                            alt="token"
                            width={20}
                            height={20}
                          />
                          {parseFloat(item.old_volume_token).toFixed(2)}
                          {item.new_volume_token > item.old_volume_token ? (
                            <span className="text-green-500 ml-2">
                              +
                              {parseFloat(
                                item.new_volume_token - item.old_volume_token
                              ).toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-red-500 ml-2">
                              {parseFloat(
                                item.new_volume_token - item.old_volume_token
                              ).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-300">
                          ${parseFloat(item.new_volume_balance).toFixed(2)}{" "}
                        </div>
                        <div className="text-sm text-slate-300 flex items-center">
                          <Image
                            src={bgToken}
                            alt="token"
                            width={20}
                            height={20}
                          />
                          {parseFloat(item.new_volume_token).toFixed(2)}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {moment(item.created_at).fromNow()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
