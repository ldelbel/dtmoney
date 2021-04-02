import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.value;
        acc.total += transaction.value;
      } else {
        acc.withdraws += transaction.value;
        acc.total -= transaction.value;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Income</p>
          <img src={incomeImg} alt="income" />
        </header>
        <strong>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Outcome</p>
          <img src={outcomeImg} alt="outcome" />
        </header>
        <strong>
          -{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(summary.withdraws)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
