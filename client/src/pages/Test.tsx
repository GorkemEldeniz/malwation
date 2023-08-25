import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

function Test() {
  return (
    <div>
      <Button size="medium" color="primary">
        Tıkla
      </Button>
      <Input
        type="text"
        color="tertiary"
        leftIcon="lock"
        size="large"
        id="username"
      />
      <Select
        size="large"
        color="secondary"
        data={["male", "female", "nonebinary"]}
      ></Select>
    </div>
  );
}

export default Test;
