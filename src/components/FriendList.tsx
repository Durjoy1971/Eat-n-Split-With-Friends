import React, { useState } from "react";
import initialFriendsTyped from "../Typed";
import Friend from "./Friend";

export default function FriendList({
  friends,
  setFriends,
  addFriendFlag,
  setAddFriendFlag,
  handleSelectBtn,
  selectedId,
}: {
  friends: initialFriendsTyped[];
  setFriends: React.Dispatch<React.SetStateAction<initialFriendsTyped[]>>;
  addFriendFlag: boolean;
  setAddFriendFlag: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: number;
  handleSelectBtn: (userId: number) => void;
}) {
  const [newFriendName, setNewFriendName] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("https://i.pravatar.cc/44");
  const handleClick = () => {
    setAddFriendFlag((prev) => {
      return !prev;
    });
  };
  const handleAdd = () => {
    if (newFriendName.trim().length <= 0 || newImage.trim().length <= 0) return;
    alert("New Friend Added");
    const imgId = crypto.randomUUID();
    const newFriend: initialFriendsTyped = {
      id: Date.now(),
      name: newFriendName,
      image: `${newImage}?=${imgId}`,
      balance: 0,
    };
    setFriends((prev) => [...prev, newFriend]);
    setNewFriendName("");
    setNewImage("https://i.pravatar.cc/44");
  };

  return (
    <div className="max-w-96 bg-orange-200">
      {friends.map((friend) => {
        return (
          <Friend
            key={friend.id}
            friend={friend}
            handleSelectBtn={handleSelectBtn}
            selectedId={selectedId}
          />
        );
      })}
      <div className="flex flex-col gap-4 items-center justify-center py-3">
        <div className="bg-orange-100">
          {addFriendFlag && (
            <div className="grid grid-rows-3 gap-4 p-5">
              <div className="flex gap-4 justify-around items-center">
                <h1>👫 Friend name</h1>
                <input
                  type="text"
                  className="px-2 py-[2px]"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                />
              </div>
              <div className="flex gap-4 justify-around items-center">
                <h1>🌄 Image URL</h1>
                <input
                  type="text"
                  className="px-2 py-[2px]"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />
              </div>
              <button
                className="border bg-teal-600 py-[5px] rounded-md text-white font-medium justify-end"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          )}
        </div>
        <button
          className="border bg-teal-600 py-[7px] px-2 rounded-md text-white font-medium"
          onClick={handleClick}
        >
          {addFriendFlag ? "Close" : "Add Friend"}
        </button>
      </div>
    </div>
  );
}
