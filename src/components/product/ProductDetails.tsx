interface IProps {
  configure: {
    ram: string;
    hardDisk: string;
    cpu: string;
    screen: string;
    camera: string;
    battery: string;
    os: string;
    gpu: string;
  };

  brand: string;
  color: string;
}

const ProductDetails = ({ configure, brand, color }: IProps) => {

  if (!configure) {
    return <p>loading</p>
  }

  return (
    <section className="bg-white rounded-md p-4 mb-auto order-1 md:order-none">
      <table>
        <tbody>
          {Object.entries(configure)
            .concat([
              ["Brand", brand],
              ["Color", color],
            ])
            .sort()
            .map(([key, value]) => {
              if (key === '_id') return
              return (
                <tr key={key}>
                  <td className="pr-4 text-sm">{key}</td>
                  <td className="text-sm max-w-sm"><p className="">{value}</p></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default ProductDetails;
