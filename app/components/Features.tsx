"use client";
import { Card, Col, Row, Typography } from "antd";
import {
  CodeOutlined,
  EditOutlined,
  EnvironmentOutlined,
  RocketOutlined,
} from "@ant-design/icons"; // Importing Ant Design icons

const { Title, Paragraph } = Typography;

interface BenefitsProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: RocketOutlined,
    title: "Stunning High Resolution",
    description:
      "Download your edited images in high quality, perfect for print, social media, or personal use",
  },
  {
    icon: EditOutlined,
    title: "Add Custom Text",
    description:
      "Type in your message and customize its appearance behind the image.",
  },
  {
    icon: CodeOutlined,
    title: "Preview and Share",
    description:
      "See how your creation looks and share it with the world!",
  },
  {
    icon: EnvironmentOutlined,
    title: "No Watermarks",
    description:
      "Enjoy a seamless editing experience without distracting watermarks on your finished images.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="container  m-auto">
      <Row gutter={[16, 24]} justify="center" align="middle">
        <Col lg={8} data-aos="fade-left" data-aos-duration="1000" >
          <div className="mb-4">
            <Title level={1} style={{ textDecoration: 'underline', textDecorationColor: '#9CA986' }}>
              Transform Your Images Instantly
            </Title>
          </div>
          <Paragraph className="text-xl text-muted-foreground mb-8">
            Effortlessly Remove Backgrounds, Add Text, and Download High-Quality Images
          </Paragraph>
        </Col>

        <Col lg={12}>
          <Row gutter={[16, 16]}>
            {benefitList.map(({ icon: Icon, title, description }, index) => (
              <Col xs={24} sm={12} key={title}>
                <Card
                  hoverable
                  className="transition-all delay-75 group/number hover:scale-105 hover:bg-[#9CA986]/20 border-[#9CA986]/50"
                >
                  <div className="flex justify-between">
                    <Icon className="text-primary mb-6 " />
                    <span className="text-5xl text-[#9CA986] font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                      0{index + 1}
                    </span>
                  </div>

                  <Card.Meta
                    title={<Title level={4}>{title}</Title>}
                    description={
                      <Paragraph className="text-muted-foreground">
                        {description}
                      </Paragraph>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default BenefitsSection;
