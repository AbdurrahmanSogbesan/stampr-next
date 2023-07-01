import styles from "./Dice.module.scss";

interface DiceProps {
  face: number;
}

export const Dice: React.FC<DiceProps> = (props) => {
  const faceOne = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const faceTwo = [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
  ];
  const faceThree = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const faceFour = [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ];
  const faceFive = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
  ];

  const faceSix = [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
  ];

  const faces = [faceOne, faceTwo, faceThree, faceFour, faceFive, faceSix];

  const renderFace = () => {
    const currentFace = faces[props.face - 1];
    return currentFace.map((face, faceIndex) => {
      return (
        <tr key={`face_${faceIndex}`}>
          {face.map((item) =>
            !item ? (
              <td>
                <div className={styles.Space}></div>
              </td>
            ) : (
              <td>
                <div className={styles.Die}></div>
              </td>
            )
          )}
        </tr>
      );
    });
  };

  return (
    <table className={styles.Table}>
      <tbody>{renderFace()}</tbody>
    </table>
  );
};
