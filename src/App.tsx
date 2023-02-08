import Global from "./styles/global";
import "./App.css";
import api from "./server/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";

interface Idata {
  amount: string;
  installments: number;
  mdr: string;
  days?: [];
}

function App() {
  const [listPeriods, setListPeriods] = useState([1, 15, 30, 90]);
  const [listToExibition, setListToExibition] = useState([1, 15, 30, 90]);
  const [listValuesByPeriods, setListValuesByPeriods] = useState([0, 0, 0, 0]);
  const [hasChangeOnPeriods, setHasChangeOnPeriods] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Idata>();

  const onSubmitFunction: SubmitHandler<Idata> = (data) => {
    hasChangeOnPeriods
      ? api
          .post("", {
            amount: data.amount,
            installments: data.installments,
            mdr: data.mdr,
            days: listPeriods, // não pode conter mais que 10 items
          })
          .then((res) => {
            setListValuesByPeriods(Object.values(res.data));
            setHasChangeOnPeriods(false);
            setListToExibition([...listPeriods]);
          })
      : api
          .post("", {
            amount: data.amount,
            installments: data.installments,
            mdr: data.mdr,
          })
          .then((res) => {
            setListValuesByPeriods(Object.values(res.data));
            setHasChangeOnPeriods(false);
            setListToExibition([...listPeriods]);
          });
  };

  const removePeriod = (e: any) => {
    const newListPeriods = listPeriods.filter(
      (period) => period !== Number(e.target.id)
    );
    setListPeriods([...newListPeriods]);
  };

  const addPeriod = (e: any) => {
    // e.preventDefault();
    const newPeriod = e.target.previousSibling.value;
    console.dir(newPeriod);
    // let orderedNewListPeriods = [...listPeriods, newPeriod].sort();
    setListPeriods([...listPeriods, Number(newPeriod)]);
  };

  return (
    <>
      <Global />
      <div className="App">
        <section>
          <div className="form-anticipation">
            <form id="form" onSubmit={handleSubmit(onSubmitFunction)}>
              <h1>Simule sua antecipação</h1>

              <label htmlFor="amount">
                Informe o valor da venda *{" "}
                <input
                  type="text"
                  id="amount"
                  {...register("amount", { required: true })}
                />
                {errors.amount && <span>This field is required</span>}
              </label>

              <label htmlFor="installments">
                Em quantas parcelas *{" "}
                <input
                  type="number"
                  min={1}
                  max={12}
                  id="installments"
                  {...register("installments", { required: true })}
                />
                {errors.installments && <span>This field is required</span>}
                <small>Máximo de 12 parcelas</small>
              </label>

              <label htmlFor="mdr">
                Informe o percentual de MDR *{" "}
                <input
                  type="text"
                  id="mdr"
                  {...register("mdr", { required: true })}
                />
                {errors.mdr && <span>This field is required</span>}
              </label>

              <label htmlFor="days">Períodos para cálculo * </label>
              <button
                onClick={() =>
                  hasChangeOnPeriods
                    ? setHasChangeOnPeriods(false)
                    : setHasChangeOnPeriods(true)
                }
                type={"button"}
              >
                Adicionar / Remover Períodos
              </button>
              <div className="box-periods">
                {listPeriods.map((period) => (
                  <div className="block-period" id={String(period)}>
                    <input
                      id="days"
                      {...register("days")}
                      value={String(period)}
                      placeholder={String(period)}
                      disabled={true}
                    ></input>
                    {hasChangeOnPeriods && (
                      <IoIosRemoveCircleOutline
                        size={"1.5em"}
                        color={"red"}
                        id={String(period)}
                        onClick={removePeriod}
                      />
                    )}
                  </div>
                ))}
                {hasChangeOnPeriods && (
                  <div className="block-period">
                    <input id="days" {...register("days")}></input>
                    <IoIosAddCircleOutline
                      size={"1.5em"}
                      color={"blue"}
                      onClick={addPeriod}
                    />
                  </div>
                )}
              </div>

              <button type="submit" id="simular">
                Simular
              </button>
            </form>
          </div>
          <div className="result-api">
            <div>
              <h3>
                VOCÊ RECEBERÁ: <hr />
              </h3>
              {listToExibition.map((value, key) => (
                <p>
                  Em {value} dias:{" "}
                  {listValuesByPeriods[key].toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
