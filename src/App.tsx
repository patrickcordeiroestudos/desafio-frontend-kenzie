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
                <select id="days" {...register("days")} onChange={includeDay}>
                  <option value="" disabled selected>
                    Escolha o período
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                  <option value="71">71</option>
                  <option value="72">72</option>
                  <option value="73">73</option>
                  <option value="74">74</option>
                  <option value="75">75</option>
                  <option value="76">76</option>
                  <option value="77">77</option>
                  <option value="78">78</option>
                  <option value="79">79</option>
                  <option value="80">80</option>
                  <option value="81">81</option>
                  <option value="82">82</option>
                  <option value="83">83</option>
                  <option value="84">84</option>
                  <option value="85">85</option>
                  <option value="86">86</option>
                  <option value="87">87</option>
                  <option value="88">88</option>
                  <option value="89">89</option>
                  <option value="90">90</option>
                </select>
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
                  <p>Amanhã: R$ {data["1"]},00</p>
                  <p>Em 15 dias: R$ {data["15"]},00</p>
                  <p>Em 30 dias: R$ {data["30"]},00</p>
                  <p>Em 90 dias: R$ {data["90"]},00</p>
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
