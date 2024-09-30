import {useState } from "react";
import FriendList from "./components/FriendList";
import initialFriendsTyped from "./Typed";

const initialFriends: initialFriendsTyped[] = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
  {
    id: 49901,
    name: "Bijoy",
    image: "https://i.pravatar.cc/48?u=49901",
    balance: 0,
  },
];

function App() {
  //* Add Friend Part
  const [friends, setFriends] = useState<initialFriendsTyped[]>(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState<initialFriendsTyped>();
  const [addFriendFlag, setAddFriendFlag] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(-1);

  //*  Bill Split Part
  const [billValue, setBillValue] = useState<number>(0);
  const [yourExpense, setYourExpense] = useState<number>(0);
  const [whoIsPaying, setWhoIsPaying] = useState<string>("You");

  const handleSelectBtn = (userId: number) => {
    if (selectedId === userId) setSelectedId(-1);
    else setSelectedId(userId);

    if (userId !== -1) setAddFriendFlag(false);
    friends.map((friend) => {
      if (friend.id === userId) {
        setSelectedFriend(friend);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (billValue === 0) alert("Enter Bill Correctly");
    else {
      const updatedFriends = friends.map((friend) => {
        if (friend.id === selectedId) {
          const newBalance: number =
            whoIsPaying === "You" ? (billValue-yourExpense) : -1 * (yourExpense);
          return { ...friend, balance: friend.balance + newBalance };
        } else return friend;
      });
      setFriends(updatedFriends);
      setBillValue(0);
      handleSelectBtn(-1);
    }
  };

  return (
    <div
      className={
        selectedId === -1
          ? "max-w-3xl pt-40 flex justify-center items-center"
          : "max-w-3xl grid grid-cols-2 pt-40 mx-auto"
      }
    >
      <FriendList
        friends={friends}
        setFriends={setFriends}
        addFriendFlag={addFriendFlag}
        setAddFriendFlag={setAddFriendFlag}
        handleSelectBtn={handleSelectBtn}
        selectedId={selectedId}
      />
      {selectedId !== -1 && (
        <form
          className="flex flex-col gap-2 justify-center items-center bg-orange-100"
          onSubmit={handleSubmit}
        >
          <h1 className="font-extrabold font-display text-lg text-lime-600">
            SPLIT A BILL WITH {`${selectedFriend?.name.toUpperCase()}`}
          </h1>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex flex-col gap-2">
              <h1 className="font-display font-semibold">💰 Bill value</h1>
              <input
                type="text"
                className="hover:bg-slate-100 ml-5 rounded-md py-[2px] px-3 font-medium"
                onChange={(e) => {
                  const expense: number = Number(e.target.value);
                  if (expense >= 0) {
                    setBillValue(expense);
                    setYourExpense(0);
                  }
                }}
                value={billValue}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-display font-semibold">🧍‍♀️ Your expense </h1>
              <input
                type="text"
                className="hover:bg-slate-100 ml-5 rounded-md py-[2px] px-3 font-medium"
                onChange={(e) => {
                  const expense: number = Number(e.target.value);
                  if (expense >= 0 && expense <= billValue)
                    setYourExpense(expense);
                }}
                value={yourExpense}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-display font-semibold">👫 Clark's expense</h1>
              <input
                type="text"
                className="hover:bg-slate-100 ml-5 rounded-md py-[2px] px-3 bg-slate-300 font-medium"
                value={billValue - yourExpense}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-display font-semibold">
                🤑 Who is paying the bill
              </h1>
              <select
                className="hover:bg-slate-100 ml-5 rounded-md py-[2px] px-3 font-medium"
                onChange={(e) => setWhoIsPaying(e.target.value)}
              >
                <option value="You">You</option>
                <option value={selectedFriend?.name}>
                  {selectedFriend?.name}
                </option>
              </select>
            </div>
          </div>
          <button className="border bg-teal-600 py-[1px] px-8 rounded-md text-white font-normal mt-2">
            Split bill
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
