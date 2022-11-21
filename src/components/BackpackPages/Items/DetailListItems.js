import bgToken from "@/dist/token.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getItemType } from "constant-pokechain";
import { ArrowLeftIcon, XIcon } from "@heroicons/react/solid";
import { useMediaQuery } from "react-responsive";
import { getPriceToToken } from "@/utils/constant";
import { useMutation, useQueryClient } from "react-query";
import { sellBackpackItems } from "../schema/mutation";
import { useAxios } from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setNotification } from "@/redux/action/notificationActions";
import ConfirmSellItems from "./ConfirmSellItems";

const rateToken = 0.028888;

const DetailListPokemon = ({ open, setOpen, detailItems, detailRef }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [inputQty, setInputQty] = useState();
  const [inputPrice, setInputPrice] = useState();
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "cannot exceed the available quantity"
  );
  const [nextSell, setNextSell] = useState(false);
  const [confirmSell, setConfirmSell] = useState(false);

  const initialValueForm = {
    id: detailItems.id,
    price: 0,
    quantity: 0,
    name: detailItems.name,
    rarity: getItemType(detailItems.name).detail.rarity.name,
  };

  const [form, setForm] = useState(initialValueForm);

  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (data) => sellBackpackItems(axiosInstance, data),
    onMutate: () => {
      setOpen(false);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries("listItems");
      queryClient.invalidateQueries("allItems");
      setNotification(dispatch, {
        message: result.msg,
        error: false,
      });
    },
  });

  const handleMutationConfirm = () => {
    mutation.mutate(form);
  };

  useEffect(() => {
    setForm(initialValueForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailItems.name]);

  return (
    <>
      <ConfirmSellItems
        open={confirmSell}
        setOpen={setConfirmSell}
        onSubmit={handleMutationConfirm}
        form={form}
      />
      <div ref={detailRef}>
        <aside
          className={`${
            isMobile ? "w-full" : "w-96"
          } p-8 border-l border-slate-800 shadow-md shadow-slate-700 overflow-y-auto block`}
        >
          <div className="top-0 left-0">
            <div
              className="p-2  hover:bg-slate-700 rounded-full w-max cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {!isMobile ? (
                <XIcon className="w-8 h-8 text-white" />
              ) : (
                <ArrowLeftIcon className="w-8 h-8 text-white" />
              )}
            </div>
          </div>
          <div className="pb-16 space-y-6">
            <div>
              <div className=" w-full flex items-center justify-center aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                <Image
                  src={getItemType(detailItems.name).img}
                  width={200}
                  height={200}
                  alt={detailItems.name}
                />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-medium text-white capitalize">
                    {detailItems.name.replace("-", " ")}
                  </h2>
                  <p className="text-sm font-medium text-gray-500">
                    Quantity {detailItems.quantity}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-white">Information</h3>
              <dl className="mt-2 border-t border-gray-200 divide-y divide-gray-200">
                <div className="py-3 flex flex-col text-sm font-medium space-y-4">
                  <span className="text-md text-white font-medium">
                    Rarity : {getItemType(detailItems.name).detail.rarity.name}
                  </span>
                  <span className="text-md text-white font-medium">
                    Effect : {getItemType(detailItems.name).detail.effect}
                  </span>
                  <span className="text-md text-white font-medium">
                    Required Used :{" "}
                    {getItemType(detailItems.name).detail.required.name}
                  </span>
                </div>
              </dl>
            </div>
            {getItemType(detailItems.name).detail.required.value && (
              <div>
                <h3 className="font-medium text-white">Detail Effect</h3>
                <dl className="mt-2 border-t border-gray-200 divide-y divide-gray-200">
                  <div className="py-3 flex flex-col text-sm font-medium space-y-4">
                    {getItemType(detailItems.name).detail.required.value?.map(
                      (list) => (
                        <span
                          className="text-md text-white font-medium"
                          key={list.level}
                        >
                          Increase {list.name} {list.value}
                        </span>
                      )
                    )}
                  </div>
                </dl>
              </div>
            )}

            <div className="flex flex-col">
              <div className="flex space-x-4">
                {!nextSell ? (
                  <>
                    <div className="flex flex-col space-y-2">
                      <label className="text-rose-500">Sell Items</label>
                      <div className="flex space-x-4">
                        <input
                          id="qty"
                          type="number"
                          value={inputQty}
                          onChange={(e) => {
                            setInputQty(e.target.value);
                            setForm({
                              ...form,
                              quantity: parseInt(e.target.value),
                            });
                          }}
                          placeholder="Please input quantity"
                          className={`bg-transparent py-2 px-2 border ${
                            inputError ? "border-rose-600" : "border-slate-600"
                          } rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none `}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (inputQty > detailItems.quantity) {
                              setInputError(true);
                              setErrorMessage("quantity is not enough");
                            } else {
                              if (
                                inputQty < 1 ||
                                typeof inputQty === "undefined"
                              ) {
                                setInputError(true);
                                setErrorMessage("cannot be less than 1");
                              } else {
                                setNextSell(true);
                                setInputError(false);
                              }
                            }
                          }}
                          className="flex-1 bg-indigo-600 py-2  px-12 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col w-full space-y-2">
                    <span className="text-white text-md font-medium">
                      Information
                    </span>
                    <span className="text-sm font-medium text-indigo-500">
                      Rate token today: {rateToken}
                    </span>
                    <div className="flex flex-col border-t space-y-2 ">
                      <span className="text-sm font-medium text-white mt-2 capitalize  ">
                        You sell : {inputQty}{" "}
                        {detailItems.name.replace("-", " ")}
                      </span>
                      <span className="text-sm font-medium text-white">
                        Total earn
                      </span>
                      <div className="flex items-center space-x-2">
                        <Image
                          src={bgToken}
                          alt="token"
                          width={30}
                          height={30}
                        />
                        <span className="capitalize text-sm font-bold text-slate-300 ">
                          {getPriceToToken(
                            (inputPrice ? inputPrice : 0) * inputQty
                          )}{" "}
                          / ${inputPrice ? inputPrice : 0}
                        </span>
                      </div>
                    </div>

                    <input
                      id="price"
                      type="number"
                      value={inputPrice}
                      onChange={(e) => {
                        setInputPrice(e.target.value);
                        setForm({
                          ...form,
                          price: parseInt(e.target.value),
                        });
                      }}
                      placeholder="Please input price"
                      className={`bg-transparent py-2 px-2 border ${
                        inputError ? "border-rose-600" : "border-slate-600"
                      } rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none `}
                    />
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setNextSell(false);
                          setInputError(false);
                          setErrorMessage("");
                        }}
                        className="flex-1 bg-gray-600 py-2  px-12 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            inputPrice < 1 ||
                            typeof inputPrice === "undefined"
                          ) {
                            setInputError(true);
                            setErrorMessage("price cannot be less than $1");
                          } else {
                            setConfirmSell(true);
                          }
                        }}
                        className="flex-1 bg-rose-600 py-2  px-12 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-rose-700 focus:outline-none"
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {inputError && (
                <p className="text-rose-500 text-xs flex">{errorMessage}</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default DetailListPokemon;
