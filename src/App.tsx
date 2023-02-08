import Global from "./styles/global";
import "./App.css";
import api from "./server/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface Idata {
  amount: string;
  installments: number;
  mdr: string;
  days?: [];
}

function App() {
  const [data, setData] = useState({ "1": 0, "15": 0, "30": 0, "90": 0 });
  const [listDays, setListDays] = useState<number[]>([]);
  const [listDaysFinal, setListDaysFinal] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Idata>();

  const onSubmitFunction: SubmitHandler<Idata> = (data) => {
    listDays.length > 0 && setListDaysFinal([...listDays]);

    listDays.length > 0
      ? api
          .post("", {
            amount: data.amount,
            installments: data.installments,
            mdr: data.mdr,
            days: listDays, // não pode conter mais que 10 items
          })
          .then((res) => {
            console.log(res);
            setData(res.data);
            setListDays([]);
          })
      : api
          .post("", {
            amount: data.amount,
            installments: data.installments,
            mdr: data.mdr,
          })
          .then((res) => {
            console.log(res);
            setData(res.data);
          });
  };

  const includeDay = (e: any) => {
    setListDays([...listDays, Number(e.target.value)]);
    listDays.sort((a, b) => a - b);
  };

  console.log(listDaysFinal);

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

              <label htmlFor="days">
                Informe o período a ser incluído na simulação *{" "}
                <input
                  id="days"
                  {...register("days")}
                  onChange={includeDay}
                ></input>
                {errors.days && <span>This field is required</span>}
              </label>

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
              {listDaysFinal.length > 0 ? (
                <>
                  {listDaysFinal.map((day, key) => (
                    <p>
                      Em {day} dias: R$ {listDaysFinal[key]},00
                    </p>
                  ))}
                  {/* <p>Amanhã: R$ {data["1"]},00</p>
                  <p>Em 15 dias: R$ {data["15"]},00</p>
                  <p>Em 30 dias: R$ {data["30"]},00</p>
                  <p>Em 90 dias: R$ {data["90"]},00</p> */}
                </>
              ) : (
                <>
                  <p>
                    Amanhã:{" "}
                    {Number(data["1"]).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>
                    Em 15 dias:{" "}
                    {Number(data["15"]).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>
                    Em 30 dias:{" "}
                    {Number(data["30"]).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>
                    Em 90 dias:{" "}
                    {Number(data["90"]).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
