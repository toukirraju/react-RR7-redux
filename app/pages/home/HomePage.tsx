import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Tabs,
  Card,
  Stack,
  Group,
  Badge,
  Button,
  ScrollArea,
  Paper,
} from "@mantine/core";
import { IconBook, IconCode, IconRoute, IconFolder } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/lib/redux/hooks";
import { selectIsAuthenticated } from "~/features/auth/authSelectors";

import readmeMd from "../../../docs/README.md?raw";
import authenticationMd from "../../../docs/authentication.md?raw";
import apiReferenceMd from "../../../docs/api_reference.md?raw";
import routingMd from "../../../docs/routing.md?raw";
import folderStructureMd from "../../../docs/folder_structure.md?raw";

const docsFiles = {
  readme: readmeMd,
  authentication: authenticationMd,
  api: apiReferenceMd,
  routing: routingMd,
  structure: folderStructureMd,
};

export function HomePage() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [activeTab, setActiveTab] = useState<string | null>("readme");

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Paper p="xl" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <div>
                <Title order={1} mb="sm">
                  React Router v7 + Redux Toolkit
                </Title>
                <Text size="lg" c="dimmed" mb="lg">
                  Enterprise-grade React application with authentication, routing, and state management
                </Text>
              </div>
              {isAuthenticated ? (
                <Button onClick={() => navigate("/dashboard")} size="lg">
                  Go to Dashboard
                </Button>
              ) : (
                <Button onClick={() => navigate("/login")} size="lg">
                  Get Started
                </Button>
              )}
            </Group>

            <Group gap="md">
              <Badge size="lg" variant="light" color="blue">
                React Router v7
              </Badge>
              <Badge size="lg" variant="light" color="green">
                Redux Toolkit
              </Badge>
              <Badge size="lg" variant="light" color="violet">
                RTK Query
              </Badge>
              <Badge size="lg" variant="light" color="orange">
                TypeScript
              </Badge>
              <Badge size="lg" variant="light" color="cyan">
                Mantine UI
              </Badge>
            </Group>
          </Stack>
        </Paper>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="readme" leftSection={<IconBook size="1rem" />}>
                Overview
              </Tabs.Tab>
              <Tabs.Tab value="authentication" leftSection={<IconCode size="1rem" />}>
                Authentication
              </Tabs.Tab>
              <Tabs.Tab value="api" leftSection={<IconCode size="1rem" />}>
                API Reference
              </Tabs.Tab>
              <Tabs.Tab value="routing" leftSection={<IconRoute size="1rem" />}>
                Routing
              </Tabs.Tab>
              <Tabs.Tab value="structure" leftSection={<IconFolder size="1rem" />}>
                Folder Structure
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="readme" pt="lg">
              <ScrollArea h={600} type="auto">
                <div className="markdown-content" style={{ paddingRight: "1rem" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {docsFiles.readme}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="authentication" pt="lg">
              <ScrollArea h={600} type="auto">
                <div className="markdown-content" style={{ paddingRight: "1rem" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {docsFiles.authentication}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="api" pt="lg">
              <ScrollArea h={600} type="auto">
                <div className="markdown-content" style={{ paddingRight: "1rem" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {docsFiles.api}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="routing" pt="lg">
              <ScrollArea h={600} type="auto">
                <div className="markdown-content" style={{ paddingRight: "1rem" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {docsFiles.routing}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="structure" pt="lg">
              <ScrollArea h={600} type="auto">
                <div className="markdown-content" style={{ paddingRight: "1rem" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {docsFiles.structure}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </Tabs.Panel>
          </Tabs>
        </Card>
      </Stack>
    </Container>
  );
}
