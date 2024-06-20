import { Router } from 'express';
import {Device} from '../models/device';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save();
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/room/:roomId', async (req, res) => {
  const { roomId } = req.params;
  try {
    if (!roomId) {
      return res.status(400).json({ error: 'Room ID is required' });
    }
    const devices = await Device.find({ roomId });
    if (devices.length === 0) {
      return res.status(404).json({ error: 'No devices found for this room ID' });
    }
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const devices = await Device.find({ status });
    if (devices.length === 0) {
      return res.status(404).json({ error: 'No devices found with this status' });
    }
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
