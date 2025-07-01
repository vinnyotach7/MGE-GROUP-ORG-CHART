"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import {
  Users,
  Plus,
  Edit3,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Grid,
  Building2,
  Briefcase,
  TrendingUp,
  GitBranch,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  BookOpen,
  UserCheck,
  Compass,
  GraduationCap,
  FileText,
  Award,
  Navigation,
} from "lucide-react"

// Enhanced Types for ograph.io features
interface LearningModule {
  id: string
  title: string
  description: string
  type: "course" | "workshop" | "certification" | "mentoring" | "reading"
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  assignedTo: string[]
  prerequisites: string[]
  completedBy: string[]
  dueDate: string
  category: string
  materials: string[]
  instructor: string
  status: "draft" | "active" | "completed" | "archived"
}

interface WorkflowStep {
  id: string
  title: string
  description: string
  assignedRole: string
  estimatedTime: string
  dependencies: string[]
  resources: string[]
  approvalRequired: boolean
}

interface Policy {
  id: string
  title: string
  description: string
  category: string
  version: string
  effectiveDate: string
  reviewDate: string
  approvedBy: string
  applicableTo: string[]
  documents: string[]
  status: "draft" | "active" | "under-review" | "archived"
}

interface CareerPath {
  id: string
  currentRole: string
  nextRoles: string[]
  requiredSkills: string[]
  timeframe: string
  mentors: string[]
  milestones: string[]
  resources: string[]
}

interface OnboardingTask {
  id: string
  title: string
  description: string
  category: "hr" | "it" | "department" | "training" | "social"
  assignedTo: string
  dueDate: string
  priority: "low" | "medium" | "high" | "critical"
  status: "pending" | "in-progress" | "completed" | "blocked"
  dependencies: string[]
  resources: string[]
  estimatedTime: string
}

interface RoleDefinition {
  id: string
  title: string
  department: string
  level: string
  responsibilities: string[]
  requiredSkills: string[]
  preferredSkills: string[]
  reportingStructure: {
    reportsTo: string
    directReports: string[]
    collaboratesWith: string[]
  }
  kpis: string[]
  careerProgression: string[]
  compensation: {
    salaryRange: string
    benefits: string[]
    bonuses: string[]
  }
}

// Existing interfaces...
interface Meeting {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: number
  attendees: string[]
  type: "one-on-one" | "team" | "all-hands" | "project"
  status: "scheduled" | "completed" | "cancelled"
  location: string
  isRecurring: boolean
}

interface Objective {
  id: string
  title: string
  description: string
  assignedTo: string[]
  dueDate: string
  priority: "low" | "medium" | "high" | "critical"
  status: "not-started" | "in-progress" | "completed" | "blocked"
  progress: number
  category: string
  tags: string[]
}

interface Job {
  id: string
  title: string
  department: string
  level: "entry" | "mid" | "senior" | "lead" | "manager" | "director" | "executive"
  skills: string[]
  requirements: string[]
  status: "open" | "filled" | "closed"
  salary: string
  location: string
  type: "full-time" | "part-time" | "contract" | "intern"
  postedDate: string
}

interface Result {
  id: string
  title: string
  description: string
  achievedBy: string[]
  date: string
  type: "kpi" | "milestone" | "achievement" | "metric"
  value: number
  target: number
  unit: string
  category: string
  impact: "low" | "medium" | "high"
}

interface Team {
  id: string
  name: string
  description: string
  members: string[]
  lead: string
  type: "permanent" | "project" | "cross-functional"
  status: "active" | "inactive" | "disbanded"
  createdDate: string
  budget: string
  goals: string[]
}

interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  assignedTo: string[]
  status: "draft" | "active" | "paused" | "completed"
  priority: "low" | "medium" | "high"
  category: string
  estimatedDuration: string
  createdDate: string
  type: "procedure" | "policy" | "process" | "workflow"
}

interface OrgNode {
  id: string
  name: string
  title: string
  department: string
  email: string
  phone: string
  location: string
  startDate: string
  reportingTo?: string
  x: number
  y: number
  avatar?: string
  level: number
  children: string[]
  jobLevel: "entry" | "mid" | "senior" | "lead" | "manager" | "director" | "executive"
  skills: string[]
  teams: string[]
  objectives: string[]
  meetings: string[]
  results: string[]
  workflows: string[]
  learningModules: string[]
  onboardingTasks: string[]
  careerPath?: string
  roleDefinition?: string
}

interface Connection {
  from: string
  to: string
}

interface FilterState {
  search: string
  department: string
  jobLevel: string
  location: string
  team: string
  hasObjectives: boolean
  hasMeetings: boolean
  hasResults: boolean
  hasWorkflows: boolean
  hasLearning: boolean
  hasOnboarding: boolean
  startDateFrom: string
  startDateTo: string
  showActiveOnly: boolean
}

// Sample data for new features
const initialLearningModules: LearningModule[] = [
  {
    id: "l1",
    title: "React Advanced Patterns",
    description: "Learn advanced React patterns and best practices",
    type: "course",
    duration: "40 hours",
    difficulty: "advanced",
    assignedTo: ["5", "6"],
    prerequisites: ["Basic React", "JavaScript ES6"],
    completedBy: ["5"],
    dueDate: "2025-03-15",
    category: "Technical",
    materials: ["Video lectures", "Code examples", "Practice projects"],
    instructor: "2",
    status: "active",
  },
  {
    id: "l2",
    title: "Leadership Fundamentals",
    description: "Core leadership skills for new managers",
    type: "workshop",
    duration: "16 hours",
    difficulty: "intermediate",
    assignedTo: ["6", "7"],
    prerequisites: ["2+ years experience"],
    completedBy: [],
    dueDate: "2025-02-28",
    category: "Leadership",
    materials: ["Workbook", "Case studies", "Assessment tools"],
    instructor: "1",
    status: "active",
  },
]

const initialPolicies: Policy[] = [
  {
    id: "p1",
    title: "Remote Work Policy",
    description: "Guidelines for remote work arrangements",
    category: "HR",
    version: "2.1",
    effectiveDate: "2025-01-01",
    reviewDate: "2025-12-31",
    approvedBy: "1",
    applicableTo: ["all"],
    documents: ["Remote Work Agreement", "Security Guidelines"],
    status: "active",
  },
  {
    id: "p2",
    title: "Code Review Process",
    description: "Standard process for code reviews",
    category: "Development",
    version: "1.3",
    effectiveDate: "2024-06-01",
    reviewDate: "2025-06-01",
    approvedBy: "2",
    applicableTo: ["Technology"],
    documents: ["Review Checklist", "Best Practices Guide"],
    status: "active",
  },
]

const initialCareerPaths: CareerPath[] = [
  {
    id: "cp1",
    currentRole: "Senior Software Engineer",
    nextRoles: ["Tech Lead", "Engineering Manager", "Principal Engineer"],
    requiredSkills: ["Team Leadership", "System Design", "Mentoring"],
    timeframe: "12-18 months",
    mentors: ["2"],
    milestones: ["Lead a project", "Mentor junior developers", "Complete leadership training"],
    resources: ["Leadership courses", "System design books", "Mentorship program"],
  },
  {
    id: "cp2",
    currentRole: "Marketing Specialist",
    nextRoles: ["Senior Marketing Specialist", "Marketing Manager"],
    requiredSkills: ["Campaign Management", "Analytics", "Team Leadership"],
    timeframe: "18-24 months",
    mentors: ["4"],
    milestones: ["Lead a campaign", "Improve conversion by 20%", "Complete MBA or equivalent"],
    resources: ["Marketing certification", "Analytics training", "Leadership workshop"],
  },
]

const initialOnboardingTasks: OnboardingTask[] = [
  {
    id: "ot1",
    title: "Complete HR Documentation",
    description: "Fill out all required HR forms and documentation",
    category: "hr",
    assignedTo: "new-hire",
    dueDate: "Day 1",
    priority: "critical",
    status: "pending",
    dependencies: [],
    resources: ["HR Portal", "Employee Handbook"],
    estimatedTime: "2 hours",
  },
  {
    id: "ot2",
    title: "IT Setup and Security Training",
    description: "Set up computer, accounts, and complete security training",
    category: "it",
    assignedTo: "new-hire",
    dueDate: "Day 2",
    priority: "high",
    status: "pending",
    dependencies: ["ot1"],
    resources: ["IT Support", "Security Training Module"],
    estimatedTime: "4 hours",
  },
  {
    id: "ot3",
    title: "Department Introduction",
    description: "Meet team members and understand department structure",
    category: "department",
    assignedTo: "new-hire",
    dueDate: "Week 1",
    priority: "high",
    status: "pending",
    dependencies: ["ot2"],
    resources: ["Team Directory", "Department Overview"],
    estimatedTime: "8 hours",
  },
]

const initialRoleDefinitions: RoleDefinition[] = [
  {
    id: "rd1",
    title: "Senior Software Engineer",
    department: "Technology",
    level: "Senior",
    responsibilities: [
      "Design and implement complex software solutions",
      "Mentor junior developers",
      "Participate in architectural decisions",
      "Code review and quality assurance",
    ],
    requiredSkills: ["React", "TypeScript", "Node.js", "System Design"],
    preferredSkills: ["AWS", "Docker", "GraphQL", "Team Leadership"],
    reportingStructure: {
      reportsTo: "Engineering Manager",
      directReports: [],
      collaboratesWith: ["Product Manager", "UX Designer", "QA Engineer"],
    },
    kpis: ["Code quality metrics", "Feature delivery time", "Mentorship effectiveness"],
    careerProgression: ["Tech Lead", "Engineering Manager", "Principal Engineer"],
    compensation: {
      salaryRange: "$120,000 - $150,000",
      benefits: ["Health Insurance", "401k", "Stock Options"],
      bonuses: ["Performance Bonus", "Referral Bonus"],
    },
  },
]

// Sample enhanced data with new fields
const initialNodes: OrgNode[] = [
  {
    id: "1",
    name: "John Smith",
    title: "Chief Executive Officer",
    department: "Executive",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    startDate: "2020-01-15",
    x: 600,
    y: 100,
    level: 0,
    children: ["2", "3", "4"],
    jobLevel: "executive",
    skills: ["Leadership", "Strategy", "Business Development"],
    teams: [],
    objectives: [],
    meetings: [],
    results: [],
    workflows: [],
    learningModules: ["l2"],
    onboardingTasks: [],
    roleDefinition: "rd1",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    title: "Chief Technology Officer",
    department: "Technology",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    startDate: "2020-03-01",
    reportingTo: "1",
    x: 400,
    y: 250,
    level: 1,
    children: ["5", "6"],
    jobLevel: "executive",
    skills: ["Technology Strategy", "Team Leadership", "Software Architecture"],
    teams: [],
    objectives: [],
    meetings: [],
    results: [],
    workflows: [],
    learningModules: [],
    onboardingTasks: [],
  },
  {
    id: "5",
    name: "David Wilson",
    title: "Senior Software Engineer",
    department: "Technology",
    email: "david.wilson@company.com",
    phone: "+1 (555) 567-8901",
    location: "San Francisco, CA",
    startDate: "2021-01-15",
    reportingTo: "2",
    x: 300,
    y: 400,
    level: 2,
    children: [],
    jobLevel: "senior",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    teams: [],
    objectives: [],
    meetings: [],
    results: [],
    workflows: [],
    learningModules: ["l1"],
    onboardingTasks: [],
    careerPath: "cp1",
    roleDefinition: "rd1",
  },
  {
    id: "6",
    name: "Lisa Garcia",
    title: "Product Manager",
    department: "Technology",
    email: "lisa.garcia@company.com",
    phone: "+1 (555) 678-9012",
    location: "San Francisco, CA",
    startDate: "2021-02-01",
    reportingTo: "2",
    x: 500,
    y: 400,
    level: 2,
    children: [],
    jobLevel: "manager",
    skills: ["Product Strategy", "User Research", "Agile", "Analytics"],
    teams: [],
    objectives: [],
    meetings: [],
    results: [],
    workflows: [],
    learningModules: ["l1", "l2"],
    onboardingTasks: [],
  },
]

export default function OrgChartBuilder() {
  const [nodes, setNodes] = useState<OrgNode[]>(initialNodes)
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [objectives, setObjectives] = useState<Objective[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [workflows, setWorkflows] = useState<Workflow[]>([])

  // New state for ograph.io features
  const [learningModules, setLearningModules] = useState<LearningModule[]>(initialLearningModules)
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies)
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>(initialCareerPaths)
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>(initialOnboardingTasks)
  const [roleDefinitions, setRoleDefinitions] = useState<RoleDefinition[]>(initialRoleDefinitions)

  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [editingNode, setEditingNode] = useState<OrgNode | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeFilterTab, setActiveFilterTab] = useState("org-clarity")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Edit states for new entities
  const [editingLearning, setEditingLearning] = useState<LearningModule | null>(null)
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null)
  const [editingCareerPath, setEditingCareerPath] = useState<CareerPath | null>(null)
  const [editingOnboarding, setEditingOnboarding] = useState<OnboardingTask | null>(null)
  const [editingRole, setEditingRole] = useState<RoleDefinition | null>(null)

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    department: "",
    jobLevel: "",
    location: "",
    team: "",
    hasObjectives: false,
    hasMeetings: false,
    hasResults: false,
    hasWorkflows: false,
    hasLearning: false,
    hasOnboarding: false,
    startDateFrom: "",
    startDateTo: "",
    showActiveOnly: true,
  })

  const canvasRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Get unique values for filters
  const departments = Array.from(new Set(nodes.map((node) => node.department)))
  const locations = Array.from(new Set(nodes.map((node) => node.location)))
  const jobLevels = ["entry", "mid", "senior", "lead", "manager", "director", "executive"]

  // Enhanced filtering logic
  const getFilteredNodes = () => {
    return nodes.filter((node) => {
      const matchesSearch =
        node.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        node.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        node.skills.some((skill) => skill.toLowerCase().includes(filters.search.toLowerCase()))

      const matchesDepartment = !filters.department || node.department === filters.department
      const matchesJobLevel = !filters.jobLevel || node.jobLevel === filters.jobLevel
      const matchesLocation = !filters.location || node.location === filters.location
      const matchesTeam = !filters.team || node.teams.includes(filters.team)

      const matchesObjectives = !filters.hasObjectives || node.objectives.length > 0
      const matchesMeetings = !filters.hasMeetings || node.meetings.length > 0
      const matchesResults = !filters.hasResults || node.results.length > 0
      const matchesWorkflows = !filters.hasWorkflows || node.workflows.length > 0
      const matchesLearning = !filters.hasLearning || node.learningModules.length > 0
      const matchesOnboarding = !filters.hasOnboarding || node.onboardingTasks.length > 0

      const nodeStartDate = new Date(node.startDate)
      const matchesStartDateFrom = !filters.startDateFrom || nodeStartDate >= new Date(filters.startDateFrom)
      const matchesStartDateTo = !filters.startDateTo || nodeStartDate <= new Date(filters.startDateTo)

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesJobLevel &&
        matchesLocation &&
        matchesTeam &&
        matchesObjectives &&
        matchesMeetings &&
        matchesResults &&
        matchesWorkflows &&
        matchesLearning &&
        matchesOnboarding &&
        matchesStartDateFrom &&
        matchesStartDateTo
      )
    })
  }

  const filteredNodes = getFilteredNodes()

  // Generate connections
  const connections: Connection[] = filteredNodes
    .filter((node) => node.reportingTo && filteredNodes.some((n) => n.id === node.reportingTo))
    .map((node) => ({
      from: node.reportingTo!,
      to: node.id,
    }))

  // CRUD Operations for new entities
  const handleAddLearning = () => {
    const newLearning: LearningModule = {
      id: Date.now().toString(),
      title: "New Learning Module",
      description: "",
      type: "course",
      duration: "",
      difficulty: "beginner",
      assignedTo: [],
      prerequisites: [],
      completedBy: [],
      dueDate: new Date().toISOString().split("T")[0],
      category: "",
      materials: [],
      instructor: "",
      status: "draft",
    }
    setEditingLearning(newLearning)
  }

  const handleSaveLearning = () => {
    if (!editingLearning) return

    if (learningModules.find((l) => l.id === editingLearning.id)) {
      setLearningModules((prev) => prev.map((l) => (l.id === editingLearning.id ? editingLearning : l)))
    } else {
      setLearningModules((prev) => [...prev, editingLearning])
    }
    setEditingLearning(null)
  }

  const handleDeleteLearning = (id: string) => {
    if (confirm("Are you sure you want to delete this learning module?")) {
      setLearningModules((prev) => prev.filter((l) => l.id !== id))
    }
  }

  const handleAddPolicy = () => {
    const newPolicy: Policy = {
      id: Date.now().toString(),
      title: "New Policy",
      description: "",
      category: "",
      version: "1.0",
      effectiveDate: new Date().toISOString().split("T")[0],
      reviewDate: new Date().toISOString().split("T")[0],
      approvedBy: "",
      applicableTo: [],
      documents: [],
      status: "draft",
    }
    setEditingPolicy(newPolicy)
  }

  const handleSavePolicy = () => {
    if (!editingPolicy) return

    if (policies.find((p) => p.id === editingPolicy.id)) {
      setPolicies((prev) => prev.map((p) => (p.id === editingPolicy.id ? editingPolicy : p)))
    } else {
      setPolicies((prev) => [...prev, editingPolicy])
    }
    setEditingPolicy(null)
  }

  const handleDeletePolicy = (id: string) => {
    if (confirm("Are you sure you want to delete this policy?")) {
      setPolicies((prev) => prev.filter((p) => p.id !== id))
    }
  }

  // Original node operations
  const handleNodeMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.preventDefault()
      e.stopPropagation()

      const node = nodes.find((n) => n.id === nodeId)
      if (!node) return

      setSelectedNode(nodeId)
      setIsDragging(true)

      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: (e.clientX - rect.left) / zoom - pan.x - node.x,
          y: (e.clientY - rect.top) / zoom - pan.y - node.y,
        })
      }
    },
    [nodes, zoom, pan],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !selectedNode) return

      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      const newX = (e.clientX - rect.left) / zoom - pan.x - dragOffset.x
      const newY = (e.clientY - rect.top) / zoom - pan.y - dragOffset.y

      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode ? { ...node, x: Math.max(0, newX), y: Math.max(0, newY) } : node,
        ),
      )
    },
    [isDragging, selectedNode, zoom, pan, dragOffset],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setDragOffset({ x: 0, y: 0 })
  }, [])

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.3))
  const handleResetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleAddNode = () => {
    const newNode: OrgNode = {
      id: Date.now().toString(),
      name: "New Employee",
      title: "Position Title",
      department: "Department",
      email: "email@company.com",
      phone: "+1 (555) 000-0000",
      location: "Location",
      startDate: new Date().toISOString().split("T")[0],
      x: 400 + Math.random() * 200,
      y: 300 + Math.random() * 200,
      level: 1,
      children: [],
      jobLevel: "mid",
      skills: [],
      teams: [],
      objectives: [],
      meetings: [],
      results: [],
      workflows: [],
      learningModules: [],
      onboardingTasks: [],
    }
    setNodes((prev) => [...prev, newNode])
    setEditingNode(newNode)
  }

  const handleEditNode = (node: OrgNode) => {
    setEditingNode({ ...node })
  }

  const handleSaveNode = () => {
    if (!editingNode) return

    setNodes((prev) => prev.map((node) => (node.id === editingNode.id ? editingNode : node)))
    setEditingNode(null)
  }

  const handleDeleteNode = (nodeId: string) => {
    if (confirm("Are you sure you want to delete this node?")) {
      setNodes((prev) => prev.filter((node) => node.id !== nodeId))
      setSelectedNode(null)
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(
      {
        nodes,
        meetings,
        objectives,
        jobs,
        results,
        teams,
        workflows,
        learningModules,
        policies,
        careerPaths,
        onboardingTasks,
        roleDefinitions,
      },
      null,
      2,
    )
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "org-chart-complete.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string)
        if (importedData.nodes) setNodes(importedData.nodes)
        if (importedData.meetings) setMeetings(importedData.meetings)
        if (importedData.objectives) setObjectives(importedData.objectives)
        if (importedData.jobs) setJobs(importedData.jobs)
        if (importedData.results) setResults(importedData.results)
        if (importedData.teams) setTeams(importedData.teams)
        if (importedData.workflows) setWorkflows(importedData.workflows)
        if (importedData.learningModules) setLearningModules(importedData.learningModules)
        if (importedData.policies) setPolicies(importedData.policies)
        if (importedData.careerPaths) setCareerPaths(importedData.careerPaths)
        if (importedData.onboardingTasks) setOnboardingTasks(importedData.onboardingTasks)
        if (importedData.roleDefinitions) setRoleDefinitions(importedData.roleDefinitions)
      } catch (error) {
        alert("Error importing file. Please check the format.")
      }
    }
    reader.readAsText(file)
  }

  const autoLayout = () => {
    const layoutNodes = [...nodes]
    const levels: { [key: number]: OrgNode[] } = {}

    layoutNodes.forEach((node) => {
      if (!levels[node.level]) levels[node.level] = []
      levels[node.level].push(node)
    })

    Object.keys(levels).forEach((levelKey) => {
      const level = Number.parseInt(levelKey)
      const levelNodes = levels[level]
      const startX = 100
      const spacing = 250
      const y = 100 + level * 200

      levelNodes.forEach((node, index) => {
        node.x = startX + index * spacing
        node.y = y
      })
    })

    setNodes(layoutNodes)
  }

  const clearAllFilters = () => {
    setFilters({
      search: "",
      department: "",
      jobLevel: "",
      location: "",
      team: "",
      hasObjectives: false,
      hasMeetings: false,
      hasResults: false,
      hasWorkflows: false,
      hasLearning: false,
      hasOnboarding: false,
      startDateFrom: "",
      startDateTo: "",
      showActiveOnly: true,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "active":
        return "bg-green-100 text-green-800"
      case "in-progress":
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "blocked":
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "not-started":
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={14} className="text-green-600" />
      case "in-progress":
      case "active":
        return <Clock size={14} className="text-blue-600" />
      case "blocked":
        return <AlertCircle size={14} className="text-red-600" />
      case "cancelled":
        return <XCircle size={14} className="text-red-600" />
      default:
        return <Clock size={14} className="text-gray-600" />
    }
  }

  const renderFilterContent = () => {
    switch (activeFilterTab) {
      case "org-clarity":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search People</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Search by name, title, or skills..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Level</label>
                <select
                  value={filters.jobLevel}
                  onChange={(e) => setFilters({ ...filters, jobLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  <option value="">All Levels</option>
                  {jobLevels.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Activity Filters</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasLearning}
                    onChange={(e) => setFilters({ ...filters, hasLearning: e.target.checked })}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Has Learning Modules</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasOnboarding}
                    onChange={(e) => setFilters({ ...filters, hasOnboarding: e.target.checked })}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Has Onboarding Tasks</span>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Organization Structure ({filteredNodes.length})</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredNodes.map((node) => (
                  <div
                    key={node.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedNode === node.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedNode(node.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {node.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{node.name}</p>
                        <p className="text-xs text-gray-500 truncate">{node.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {node.learningModules.length > 0 && (
                            <span className="inline-flex items-center text-xs text-blue-600">
                              <BookOpen size={10} className="mr-1" />
                              {node.learningModules.length}
                            </span>
                          )}
                          {node.careerPath && (
                            <span className="inline-flex items-center text-xs text-green-600">
                              <Navigation size={10} className="mr-1" />
                              Path
                            </span>
                          )}
                          {node.roleDefinition && (
                            <span className="inline-flex items-center text-xs text-purple-600">
                              <FileText size={10} className="mr-1" />
                              Role
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditNode(node)
                        }}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        <Edit3 size={12} className="inline mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteNode(node.id)
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        <Trash2 size={12} className="inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "learning-training":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Learning & Training ({learningModules.length})</h4>
              <button
                onClick={handleAddLearning}
                className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {learningModules.map((module) => (
                <div key={module.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm text-gray-900">{module.title}</h5>
                    <div className="flex items-center space-x-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(module.status)}`}>
                        {module.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 mb-2">
                    <div className="flex items-center">
                      <BookOpen size={12} className="mr-1" />
                      {module.type} • {module.duration} • {module.difficulty}
                    </div>
                    <div>
                      Assigned: {module.assignedTo.length} • Completed: {module.completedBy.length}
                    </div>
                    <div>Due: {module.dueDate}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingLearning(module)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Edit3 size={12} className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLearning(module.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Trash2 size={12} className="inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "workflow-clarity":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Policies & Procedures ({policies.length})</h4>
              <button
                onClick={handleAddPolicy}
                className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {policies.map((policy) => (
                <div key={policy.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm text-gray-900">{policy.title}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 mb-2">
                    <div className="flex items-center">
                      <FileText size={12} className="mr-1" />
                      {policy.category} • v{policy.version}
                    </div>
                    <div>Effective: {policy.effectiveDate}</div>
                    <div>Review: {policy.reviewDate}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingPolicy(policy)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Edit3 size={12} className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePolicy(policy.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Trash2 size={12} className="inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "where-do-i-fit":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Career Paths ({careerPaths.length})</h4>
              <button
                onClick={() =>
                  setEditingCareerPath({
                    id: Date.now().toString(),
                    currentRole: "",
                    nextRoles: [],
                    requiredSkills: [],
                    timeframe: "",
                    mentors: [],
                    milestones: [],
                    resources: [],
                  })
                }
                className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {careerPaths.map((path) => (
                <div key={path.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm text-gray-900">{path.currentRole}</h5>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">{path.timeframe}</span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 mb-2">
                    <div className="flex items-center">
                      <Navigation size={12} className="mr-1" />
                      Next: {path.nextRoles.join(", ")}
                    </div>
                    <div>Skills: {path.requiredSkills.slice(0, 3).join(", ")}</div>
                    <div>Milestones: {path.milestones.length}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingCareerPath(path)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Edit3 size={12} className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this career path?")) {
                          setCareerPaths((prev) => prev.filter((p) => p.id !== path.id))
                        }
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Trash2 size={12} className="inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "job-role-clarity":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Role Definitions ({roleDefinitions.length})</h4>
              <button
                onClick={() =>
                  setEditingRole({
                    id: Date.now().toString(),
                    title: "",
                    department: "",
                    level: "",
                    responsibilities: [],
                    requiredSkills: [],
                    preferredSkills: [],
                    reportingStructure: {
                      reportsTo: "",
                      directReports: [],
                      collaboratesWith: [],
                    },
                    kpis: [],
                    careerProgression: [],
                    compensation: {
                      salaryRange: "",
                      benefits: [],
                      bonuses: [],
                    },
                  })
                }
                className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {roleDefinitions.map((role) => (
                <div key={role.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm text-gray-900">{role.title}</h5>
                    <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">{role.level}</span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 mb-2">
                    <div className="flex items-center">
                      <Briefcase size={12} className="mr-1" />
                      {role.department}
                    </div>
                    <div>Responsibilities: {role.responsibilities.length}</div>
                    <div>Required Skills: {role.requiredSkills.length}</div>
                    <div>Salary: {role.compensation.salaryRange}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingRole(role)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Edit3 size={12} className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this role definition?")) {
                          setRoleDefinitions((prev) => prev.filter((r) => r.id !== role.id))
                        }
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Trash2 size={12} className="inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "onboarding-clarity":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Onboarding Tasks ({onboardingTasks.length})</h4>
              <button
                onClick={() =>
                  setEditingOnboarding({
                    id: Date.now().toString(),
                    title: "",
                    description: "",
                    category: "hr",
                    assignedTo: "",
                    dueDate: "",
                    priority: "medium",
                    status: "pending",
                    dependencies: [],
                    resources: [],
                    estimatedTime: "",
                  })
                }
                className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {onboardingTasks.map((task) => (
                <div key={task.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm text-gray-900">{task.title}</h5>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(task.status)}
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 mb-2">
                    <div className="flex items-center">
                      <UserCheck size={12} className="mr-1" />
                      {task.category} • Due: {task.dueDate}
                    </div>
                    <div>Time: {task.estimatedTime}</div>
                    <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)} inline-block`}>
                      {task.status}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingOnboarding(task)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Edit3 size={12} className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this onboarding task?")) {
                          setOnboardingTasks((prev) => prev.filter((t) => t.id !== task.id))
                        }
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      <Trash2 size={12} className="inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">OrgChart Builder</h1>
              <span className="text-sm text-gray-500">• Complete Organizational Clarity</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddNode}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={16} />
                <span>Add Person</span>
              </button>
              <button
                onClick={autoLayout}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Grid size={16} />
                <span>Auto Layout</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={handleResetView}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Reset View"
              >
                <RotateCcw size={16} />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <TrendingUp size={16} />
                <span>Export</span>
              </button>
              <label className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                <GitBranch size={16} />
                <span>Import</span>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Enhanced Sidebar with 6 Clarity Areas */}
        {sidebarOpen && (
          <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
            {/* Filter Tabs - 6 Clarity Areas */}
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between p-4 pb-2">
                <h3 className="text-lg font-semibold text-gray-900">Organizational Clarity</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-orange-600 hover:text-orange-700 flex items-center"
                >
                  <XCircle size={14} className="mr-1" />
                  Clear All
                </button>
              </div>
              <div className="flex overflow-x-auto">
                {[
                  { id: "org-clarity", label: "Org Chart", icon: Building2, count: filteredNodes.length },
                  { id: "learning-training", label: "Learning", icon: GraduationCap, count: learningModules.length },
                  { id: "workflow-clarity", label: "Workflows", icon: GitBranch, count: policies.length },
                  { id: "where-do-i-fit", label: "Career Path", icon: Compass, count: careerPaths.length },
                  { id: "job-role-clarity", label: "Roles", icon: Award, count: roleDefinitions.length },
                  { id: "onboarding-clarity", label: "Onboarding", icon: UserCheck, count: onboardingTasks.length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilterTab(tab.id)}
                    className={`flex flex-col items-center space-y-1 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeFilterTab === tab.id
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <tab.icon size={16} />
                    <span>{tab.label}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{tab.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4">{renderFilterContent()}</div>
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={canvasRef}
            className="w-full h-full cursor-move"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              backgroundImage: showGrid ? `radial-gradient(circle, #e5e7eb 1px, transparent 1px)` : undefined,
              backgroundSize: showGrid ? `${20 * zoom}px ${20 * zoom}px` : undefined,
              backgroundPosition: `${pan.x * zoom}px ${pan.y * zoom}px`,
            }}
          >
            <div
              className="relative"
              style={{
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: "0 0",
                width: "2000px",
                height: "2000px",
              }}
            >
              {/* SVG for connections */}
              <svg
                ref={svgRef}
                className="absolute inset-0 pointer-events-none"
                style={{ width: "2000px", height: "2000px" }}
              >
                {connections.map((connection) => {
                  const fromNode = nodes.find((n) => n.id === connection.from)
                  const toNode = nodes.find((n) => n.id === connection.to)

                  if (!fromNode || !toNode) return null

                  const fromX = fromNode.x + 120
                  const fromY = fromNode.y + 80
                  const toX = toNode.x + 120
                  const toY = toNode.y

                  const midY = fromY + (toY - fromY) / 2

                  return (
                    <g key={`${connection.from}-${connection.to}`}>
                      <path
                        d={`M ${fromX} ${fromY} L ${fromX} ${midY} L ${toX} ${midY} L ${toX} ${toY}`}
                        stroke="#6b7280"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                    </g>
                  )
                })}

                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                  </marker>
                </defs>
              </svg>

              {/* Enhanced Nodes with Clarity Indicators */}
              {filteredNodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute bg-white rounded-lg shadow-lg border-2 cursor-pointer transition-all ${
                    selectedNode === node.id
                      ? "border-orange-500 shadow-xl"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-xl"
                  }`}
                  style={{
                    left: node.x,
                    top: node.y,
                    width: "280px",
                    zIndex: selectedNode === node.id ? 10 : 1,
                  }}
                  onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {node.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 truncate">{node.name}</h3>
                        <p className="text-xs text-gray-600 truncate">{node.title}</p>
                        <p className="text-xs text-gray-400 truncate">{node.jobLevel}</p>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-2">
                        <Building2 size={12} />
                        <span className="truncate">{node.department}</span>
                      </div>
                    </div>

                    {/* 6 Clarity Indicators */}
                    <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                      {node.learningModules.length > 0 && (
                        <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          <GraduationCap size={10} className="mr-1" />
                          {node.learningModules.length}
                        </span>
                      )}
                      {node.careerPath && (
                        <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded">
                          <Compass size={10} className="mr-1" />
                          Path
                        </span>
                      )}
                      {node.roleDefinition && (
                        <span className="flex items-center text-purple-600 bg-purple-50 px-2 py-1 rounded">
                          <Award size={10} className="mr-1" />
                          Role
                        </span>
                      )}
                      {node.onboardingTasks.length > 0 && (
                        <span className="flex items-center text-orange-600 bg-orange-50 px-2 py-1 rounded">
                          <UserCheck size={10} className="mr-1" />
                          {node.onboardingTasks.length}
                        </span>
                      )}
                      {node.workflows.length > 0 && (
                        <span className="flex items-center text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          <GitBranch size={10} className="mr-1" />
                          {node.workflows.length}
                        </span>
                      )}
                      {node.teams.length > 0 && (
                        <span className="flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded">
                          <Users size={10} className="mr-1" />
                          {node.teams.length}
                        </span>
                      )}
                    </div>

                    {/* Clarity Score */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Clarity Score:</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5, 6].map((i) => {
                          const hasClarity =
                            (i === 1 && node.name && node.title) ||
                            (i === 2 && node.learningModules.length > 0) ||
                            (i === 3 && node.workflows.length > 0) ||
                            (i === 4 && node.careerPath) ||
                            (i === 5 && node.roleDefinition) ||
                            (i === 6 && node.onboardingTasks.length > 0)

                          return (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${hasClarity ? "bg-green-500" : "bg-gray-300"}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-white hover:bg-gray-50 border border-gray-300 p-2 rounded-lg shadow-sm transition-colors"
              title="Toggle Sidebar"
            >
              <Users size={16} />
            </button>
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`border p-2 rounded-lg shadow-sm transition-colors ${
                showGrid ? "bg-orange-500 text-white border-orange-500" : "bg-white hover:bg-gray-50 border-gray-300"
              }`}
              title="Toggle Grid"
            >
              <Grid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modals */}
      {/* Learning Module Edit Modal */}
      {editingLearning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {learningModules.find((l) => l.id === editingLearning.id)
                ? "Edit Learning Module"
                : "Add New Learning Module"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingLearning.title}
                  onChange={(e) => setEditingLearning({ ...editingLearning, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingLearning.description}
                  onChange={(e) => setEditingLearning({ ...editingLearning, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={editingLearning.type}
                  onChange={(e) =>
                    setEditingLearning({ ...editingLearning, type: e.target.value as LearningModule["type"] })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="course">Course</option>
                  <option value="workshop">Workshop</option>
                  <option value="certification">Certification</option>
                  <option value="mentoring">Mentoring</option>
                  <option value="reading">Reading</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={editingLearning.difficulty}
                  onChange={(e) =>
                    setEditingLearning({
                      ...editingLearning,
                      difficulty: e.target.value as LearningModule["difficulty"],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={editingLearning.duration}
                  onChange={(e) => setEditingLearning({ ...editingLearning, duration: e.target.value })}
                  placeholder="e.g., 40 hours, 2 weeks"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={editingLearning.dueDate}
                  onChange={(e) => setEditingLearning({ ...editingLearning, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={editingLearning.category}
                  onChange={(e) => setEditingLearning({ ...editingLearning, category: e.target.value })}
                  placeholder="e.g., Technical, Leadership"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingLearning.status}
                  onChange={(e) =>
                    setEditingLearning({ ...editingLearning, status: e.target.value as LearningModule["status"] })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
              <input
                type="text"
                value={editingLearning.prerequisites.join(", ")}
                onChange={(e) =>
                  setEditingLearning({ ...editingLearning, prerequisites: e.target.value.split(", ").filter(Boolean) })
                }
                placeholder="Basic React, JavaScript ES6 (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Materials</label>
              <input
                type="text"
                value={editingLearning.materials.join(", ")}
                onChange={(e) =>
                  setEditingLearning({ ...editingLearning, materials: e.target.value.split(", ").filter(Boolean) })
                }
                placeholder="Video lectures, Code examples (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSaveLearning}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save Learning Module
              </button>
              <button
                onClick={() => setEditingLearning(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Policy Edit Modal */}
      {editingPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {policies.find((p) => p.id === editingPolicy.id) ? "Edit Policy" : "Add New Policy"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingPolicy.title}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingPolicy.description}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={editingPolicy.category}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, category: e.target.value })}
                  placeholder="e.g., HR, Development, Security"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                <input
                  type="text"
                  value={editingPolicy.version}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, version: e.target.value })}
                  placeholder="e.g., 1.0, 2.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                <input
                  type="date"
                  value={editingPolicy.effectiveDate}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, effectiveDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Date</label>
                <input
                  type="date"
                  value={editingPolicy.reviewDate}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, reviewDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingPolicy.status}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, status: e.target.value as Policy["status"] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="under-review">Under Review</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
              <input
                type="text"
                value={editingPolicy.documents.join(", ")}
                onChange={(e) =>
                  setEditingPolicy({ ...editingPolicy, documents: e.target.value.split(", ").filter(Boolean) })
                }
                placeholder="Policy Document, Guidelines (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSavePolicy}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save Policy
              </button>
              <button
                onClick={() => setEditingPolicy(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Node Edit Modal */}
      {editingNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingNode.id === Date.now().toString() ? "Add New Person" : "Edit Person"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingNode.name}
                  onChange={(e) => setEditingNode({ ...editingNode, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={editingNode.title}
                  onChange={(e) => setEditingNode({ ...editingNode, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={editingNode.department}
                  onChange={(e) => setEditingNode({ ...editingNode, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Level</label>
                <select
                  value={editingNode.jobLevel}
                  onChange={(e) =>
                    setEditingNode({
                      ...editingNode,
                      jobLevel: e.target.value as OrgNode["jobLevel"],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {jobLevels.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingNode.email}
                  onChange={(e) => setEditingNode({ ...editingNode, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editingNode.phone}
                  onChange={(e) => setEditingNode({ ...editingNode, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editingNode.location}
                  onChange={(e) => setEditingNode({ ...editingNode, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={editingNode.startDate}
                  onChange={(e) => setEditingNode({ ...editingNode, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reports To</label>
                <select
                  value={editingNode.reportingTo || ""}
                  onChange={(e) => setEditingNode({ ...editingNode, reportingTo: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">No Manager</option>
                  {nodes
                    .filter((n) => n.id !== editingNode.id)
                    .map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.name} - {node.title}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Career Path</label>
                <select
                  value={editingNode.careerPath || ""}
                  onChange={(e) => setEditingNode({ ...editingNode, careerPath: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">No Career Path</option>
                  {careerPaths.map((path) => (
                    <option key={path.id} value={path.id}>
                      {path.currentRole}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <input
                type="text"
                value={editingNode.skills.join(", ")}
                onChange={(e) => setEditingNode({ ...editingNode, skills: e.target.value.split(", ").filter(Boolean) })}
                placeholder="React, TypeScript, Leadership (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSaveNode}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingNode(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
